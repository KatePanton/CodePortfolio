import platform from '../../../pages/Projects/affordability-assessment/images/PlatformTables.webp'
import platformExample from '../../../pages/Projects/affordability-assessment/images/PlatformTable-example.webp'
import clients from '../../../pages/Projects/affordability-assessment/images/ClientsTables.webp'
import clientsExample from '../../../pages/Projects/affordability-assessment/images/ClientsTable-example.webp'
import type { HighlightedProject } from '../types'

const project: HighlightedProject = {
  slug: 'affordability-assessment',
  tier: 'highlighted',
  name: 'Dynamic Affordability Assessment Workflow',
  techStack: ['React', 'TypeScript', 'MobX', 'C#', 'ASP.NET Core', 'MediatR', 'Entity Framework Core', 'SQL Server'],
  blurb:
    'A full-stack workflow for recording affordability-assessment inputs, fully dynamic across three configurable levels (elements, groupings, items) so each client can define its own headings.',
  problem: `The requirement was that the assessment had to be 100% dynamic across all three levels — elements, groupings, and items — so each new client could define its own headings rather than working against a fixed, hard-coded set of fields. The input form and its validation had to be built up entirely from three linked database tables at runtime, and once submitted, those free-form client-defined inputs still had to be matched back to a fixed set of coded fields inside a separate microservice's database, so downstream reporting and decisioning logic could keep working against stable identifiers regardless of how any given client had labelled things.`,
  screenshots: [
    { src: platform, alt: 'Platform database tables defining the configurable elements, groupings, and items', caption: 'Platform' },
    { src: platformExample, alt: 'Example configuration data for the platform-level element/grouping/item tables', caption: 'Platform data example' },
    { src: clients, alt: 'Client database tables storing a submitted assessment and its summaries', caption: 'Clients' },
    { src: clientsExample, alt: 'Example data for a submitted client assessment and its summaries', caption: 'Clients data example' },
  ],
  snippets: [
    {
      label: 'API layer — the affordability assessment endpoints',
      language: 'csharp',
      code: `namespace ProductName.Clients.Api.Controllers
{
  using System;
  using System.Threading.Tasks;
  using ProductName.Clients.Application.AffordabilityAssessment.Contracts.Commands;
  using ProductName.Clients.Application.AffordabilityAssessment.Contracts.Queries;
  using ProductName.Clients.Models.Lookups;
  using ProductName.Clients.Models.SharedModels;
  using MediatR;
  using Microsoft.AspNetCore.Authorization;
  using Microsoft.AspNetCore.Mvc;

  /// <summary>
  /// Controller to provide all Affordability Assessment related endpoints
  /// </summary>
  [Route("api/[controller]")]
  [ApiController]
  [Authorize]
  public class AffordabilityAssessmentController : Controller
  {
    private readonly IMediator mediator;

    public AffordabilityAssessmentController(IMediator mediator)
    {
      this.mediator = mediator;
    }

    /// <summary>
    /// Create an Affordability Assessment.
    /// </summary>
    [HttpPost("createAffordabilityAssessment")]
    public async Task<IActionResult> CreateAffordabilityAssessment(CreateAffordabilityAssessmentCommand command)
    {
      var result = await this.mediator.Send(command).ConfigureAwait(false);

      if (result.Success)
      {
        return this.Ok(result);
      }

      return this.BadRequest(result);
    }

    /// <summary>
    /// Get the latest affordability assessment data by a source loan application Id.
    /// </summary>
    [HttpGet("getAffordabilityAssessmentByApplicationId")]
    public async Task<ActionResult<AffordabilityAssessmentAmountLookup>> GetAffordabilityAssessmentByApplicationId([FromQuery] int sourceLoanApplicationId)
    {
      var query = new GetAffordabilityAssessmentByApplicationIdQuery { SourceLoanApplicationId = sourceLoanApplicationId };
      var result = await this.mediator.Send(query).ConfigureAwait(false);

      if (result != null)
      {
        return this.Ok(result);
      }
      else
      {
        var affordabilityAssessmentAmountLookup = new AffordabilityAssessmentAmountLookup();
        return this.Accepted(affordabilityAssessmentAmountLookup);
      }
    }
  }
}`,
      talkThrough:
        "The controller exposes the read/write endpoints the frontend workflow needs: creating an assessment, and retrieving it back by loan application so a client can resume or review what they entered. It stays thin — each action just forwards the request to a MediatR handler and maps the result onto the appropriate HTTP response — with the heavier logic (validation, mapping the dynamic structure into a persistable entity) living one layer down in the command handler.",
    },
    {
      label: 'Logic layer — flattening the dynamic structure',
      language: 'csharp',
      code: `namespace ProductName.Clients.Application.AffordabilityAssessment.Handlers.CommandHandlers
{
  using System;
  using System.Collections.Generic;
  using System.Threading;
  using System.Threading.Tasks;
  using ProductName.Clients.Application.AffordabilityAssessment.Contracts.Commands;
  using ProductName.Clients.Application.Infrastructure;
  using ProductName.Clients.Models;
  using ProductName.Clients.Models.AffordabilityAssessments;
  using ProductName.Clients.Repositories.AffordabilityAssessment;
  using ProductName.Platform.Models.AffordabilityAssessments;
  using ProductName.Platform.Models.Lookups;
  using MediatR;

  /// <summary>
  /// Command handler to create a Affordability Assessment.
  /// </summary>
  public class CreateAffordabilityAssessmentCommandHandler : IRequestHandler<CreateAffordabilityAssessmentCommand, CommandResult>
  {
    private readonly IAffordabilityAssessmentRepository affordabilityAssessmentRepository;
    private AffordabilityAssessment affordabilityAssessment;

    public CreateAffordabilityAssessmentCommandHandler(
      IAffordabilityAssessmentRepository affordabilityAssessmentRepository)
    {
      this.affordabilityAssessmentRepository = affordabilityAssessmentRepository;
    }

    public async Task<CommandResult> Handle(CreateAffordabilityAssessmentCommand request, CancellationToken cancellationToken)
    {
      try
      {
        this.affordabilityAssessment = new AffordabilityAssessment();

        this.SplitAffordabilityAssessmentArray(request.AffordabilityAssessments);

        this.affordabilityAssessment.SourceLoanApplicationId = request.SourceLoanApplicationId;

        var validateAffordabilityAssessment = this.affordabilityAssessment.ValidationCheck();

        if (!validateAffordabilityAssessment.Success)
        {
          return new CommandResult(false, validateAffordabilityAssessment.ValidationErrors.ToString());
        }

        await this.affordabilityAssessmentRepository.AddAndSave(this.affordabilityAssessment).ConfigureAwait(false);
        return new CommandResult(true);
      }
      catch (Exception ex)
      {
        return new CommandResult(false, ex.Message, null);
      }
    }

    private void SplitAffordabilityAssessmentArray(List<AffordabilityAssessmentLookup> affordabilityAssessmentList)
    {
      foreach (AffordabilityAssessmentLookup assessment in affordabilityAssessmentList)
      {
        foreach (AffordabilityAssessmentElementLookup element in assessment.AffordabilityAssessmentElements)
        {
          foreach (AffordabilityAssessmentGroupingLookup grouping in element.AffordabilityAssessmentGroupings)
          {
            foreach (AffordabilityAssessmentItemLookup item in grouping.AffordabilityAssessmentItems)
            {
              this.MapAffordabilityAssessmentItemSummary(item);
            }

            this.MapAffordabilityAssessmentGroupingSummary(grouping);
          }

          this.MapAffordabilityAssessmentElementSummary(element);
        }

        this.MapAffordabilityAssessment(assessment);
      }
    }

    private void MapAffordabilityAssessment(AffordabilityAssessmentLookup assessment)
    {
      this.affordabilityAssessment.ClientId = assessment.ClientId;
      this.affordabilityAssessment.TotalAmount = assessment.AffordabilityAssessmentTotalAmount;
      this.affordabilityAssessment.Note = assessment.Note;
    }

    private void MapAffordabilityAssessmentElementSummary(AffordabilityAssessmentElementLookup element)
    {
      var elementSummary = new AffordabilityAssessmentElementSummary();
      elementSummary.SourceAffordabilityAssessmentElementId = element.AffordabilityAssessmentElementId;
      elementSummary.ElementSummary = element.ElementTotalName;
      elementSummary.ElementCode = element.ElementCode;
      elementSummary.ElementAmount = element.ElementTotalAmount;

      this.affordabilityAssessment.AffordabilityAssessmentElementSummaries.Add(elementSummary);
    }

    private void MapAffordabilityAssessmentGroupingSummary(AffordabilityAssessmentGroupingLookup grouping)
    {
      var groupingSummary = new AffordabilityAssessmentGroupingSummary();
      groupingSummary.SourceAffordabilityAssessmentGroupingId = grouping.AffordabilityAssessmentGroupingId;
      groupingSummary.GroupingSummary = grouping.GroupingTotalName;
      groupingSummary.GroupingCode = grouping.GroupingCode;
      groupingSummary.GroupingAmount = grouping.GroupingTotalAmount;

      this.affordabilityAssessment.AffordabilityAssessmentGroupingSummaries.Add(groupingSummary);
    }

    private void MapAffordabilityAssessmentItemSummary(AffordabilityAssessmentItemLookup item)
    {
      var itemSummary = new AffordabilityAssessmentItemSummary();
      itemSummary.SourceAffordabilityAssessmentItemId = item.AffordabilityAssessmentItemId;
      itemSummary.ItemSummary = item.ItemLabel;
      itemSummary.ItemAmount = item.ItemAmount;

      this.affordabilityAssessment.AffordabilityAssessmentItemSummaries.Add(itemSummary);
    }
  }
}`,
      talkThrough:
        "This is where the fully-dynamic, three-level shape (a client's own elements → groupings → items) gets flattened into something that can actually be persisted. `SplitAffordabilityAssessmentArray` walks the nested lookup tree the client submitted and, for every level, builds a summary record (item, grouping, element) that carries forward its source id, label, and amount — so the client's own custom headings are preserved on the resulting entity without the handler ever needing to know what those headings are in advance. Validation runs against the assembled entity before it's handed to the repository, so a structurally invalid submission never reaches the database.",
    },
    {
      label: 'Database layer — persisting and reading back the assessment',
      language: 'csharp',
      code: `namespace ProductName.Clients.Repositories.AffordabilityAssessment
{
  using System;
  using System.Linq;
  using System.Threading.Tasks;
  using ProductName.Clients.Constants.Enums;
  using ProductName.Clients.Models;
  using ProductName.Clients.Models.AffordabilityAssessments;
  using ProductName.Clients.Models.Lookups;
  using ProductName.Clients.Models.SharedModels;
  using ProductName.Platform.Models.Lookups;
  using Microsoft.EntityFrameworkCore;
  using Internal.Mvvm.Extensions;
  using Internal.Mvvm.Services;

  /// <summary>
  /// Affordability Assessment Repository
  /// </summary>
  public class AffordabilityAssessmentRepository : UpdateableModelService<AffordabilityAssessment, ClientsDbContext, int>, IAffordabilityAssessmentRepository
  {
    public AffordabilityAssessmentRepository(ClientsDbContext dbContext)
      : base(dbContext)
    {
    }

    public async Task AddAndSave(AffordabilityAssessment entity)
    {
      this.AddEntity(entity);
      await this.SaveChangesAsync().ConfigureAwait(false);
    }

    /// <summary>
    /// Get the latest affordability assessment summary lookup by a client Id.
    /// </summary>
    public async Task<AffordabilityAssessmentSummaryLookup> GetAffordabilityAssessmentSummaryLookupByClientId(Guid clientId)
    {
      var affordabilityAssessmentData = await this.Entities
        .Where(x => x.ClientId == clientId)
        .OrderByDescending(x => x.Audit.CreatedOn)
        .Select(x => new AffordabilityAssessmentSummaryLookup
        {
          DisposableIncome = x.TotalAmount,
          TotalBureauDebtInsuranceInstalments = x.Client.CreditReport.TotalBureauDebtInsuranceInstalments,
          CreditScore = x.Client.CreditReport.BureauCreditScore,
          TotalIncome = x.AffordabilityAssessmentGroupingSummaries.Where(c => c.GroupingCode == AffordabilityAssessmentGroupingSummaryEnum.TotalIncome.Description()).Select(c => c.GroupingAmount).FirstOrDefault(),
          TotalExpenses = x.AffordabilityAssessmentElementSummaries.Where(c => c.ElementCode == AffordabilityAssessmentElementEnum.TotalGrossExpenses.Description()).Select(c => c.ElementAmount).FirstOrDefault(),
        }).FirstOrDefaultAsync().ConfigureAwait(false);

      return affordabilityAssessmentData;
    }

    /// <summary>
    /// Get the latest affordability assessment data by a source loan application Id.
    /// </summary>
    public async Task<AffordabilityAssessmentAmountLookup> GetAffordabilityAssessmentByApplicationId(int sourceLoanApplicationId)
    {
      var affordabilityAssessmentAmountLookup = await this.Entities
             .Where(x => x.SourceLoanApplicationId == sourceLoanApplicationId)
             .OrderByDescending(x => x.Audit.CreatedOn)
             .Select(x => new AffordabilityAssessmentAmountLookup
             {
               AffordabilityAssessmentId = x.AffordabilityAssessmentId,
               ClientId = x.ClientId,
               Note = x.Note,
               AffordabilityAssessmentItems = x.AffordabilityAssessmentItemSummaries
                .Select(i => new AffordabilityAssessmentItemAmountLookup
                {
                  SourceAffordabilityAssessmentItemId = i.SourceAffordabilityAssessmentItemId,
                  ItemAmount = i.ItemAmount,
                }).ToList(),
             }).FirstOrDefaultAsync().ConfigureAwait(false);

      return affordabilityAssessmentAmountLookup;
    }
  }
}`,
      talkThrough:
        "The repository sits on top of a shared, generic model-service base class, adding the assessment-specific reads the rest of the app needs: the latest assessment's summary data and totals for a client (joined against that client's credit report for numbers like disposable income and bureau debt), and the raw item-level amounts for a given loan application so a partially completed assessment can be reloaded and continued. Each query projects straight into a lookup/DTO shape rather than returning the tracked entity, keeping the read paths decoupled from how the entity itself is structured.",
    },
    {
      label: 'Frontend functionality — view model',
      language: 'typescript',
      code: `import { List, Model, NotifyUtils } from '@internal/mvvm-core';
import { Views } from '@internal/mvvm-react';
import { AppService, Types } from '../../../../../App/Services/AppService';
import { Clients, Platform } from '../../../../../App';
import { TextConstants } from '../../../../../Common/TextConstants';
import { NotificationDuration } from '../../../../../App/Models/Enums/NotificationDuration';

@Model
export default class SelectAffordabilityAssessmentComponentVM extends Views.ViewModelBase {

    public affordabilityAssessmentList = new List(Platform.AffordabilityAssessmentLookup);
    public affordabilityAssessmentAmountLookup = new Clients.AffordabilityAssessmentAmountLookup();
    public createAffordabilityAssessmentCommand = new Clients.CreateAffordabilityAssessmentCommand();
    public getAffordabilityAssessmentLookupListQuery = new Platform.GetAffordabilityAssessmentLookupListQuery();
    public isAffordabilityAssessmentSubmittedInd = false;
    public clientId: string = "";
    public loanApplicationId = 0;

    constructor(
        taskRunner = AppService.get(Types.Mvvm.TaskRunner),
        private platformAffordabilityAssessmentsApiClient = AppService.get(Platform.PlatformTypes.ApiClients.AffordabilityAssessmentsApiClient),
        private clientAffordabilityAssessmentsApiClient = AppService.get(Clients.ClientsTypes.ApiClients.AffordabilityAssessmentsApiClient)
    ) {
        super(taskRunner);
    }

    public async load(loanApplicationId: number, clientId: string) {
        this.clientId = clientId;
        this.loanApplicationId = loanApplicationId;

        const getAffordabilityAssessmentListResponse = await this.platformAffordabilityAssessmentsApiClient.getAffordabilityAssessmentList(this.getAffordabilityAssessmentLookupListQuery!.toJSObject());
        if (getAffordabilityAssessmentListResponse.status === 200) {
            this.affordabilityAssessmentList.set(getAffordabilityAssessmentListResponse.data);
            await this.loadExistingAffordabilityAssessment(loanApplicationId);
        }
    }

    private async loadExistingAffordabilityAssessment(loanApplicationId: number) {
        const getAffordabilityAssessmentByIdResponse = await this.clientAffordabilityAssessmentsApiClient.getAffordabilityAssessmentByApplicationId(loanApplicationId);
        if (getAffordabilityAssessmentByIdResponse.status === 200) {
            this.affordabilityAssessmentAmountLookup.set(getAffordabilityAssessmentByIdResponse.data);
            this.mapExistingAffordabilityAssessment();
        }
    }

    private mapExistingAffordabilityAssessment() {
        this.affordabilityAssessmentList.forEach(assessment => {
            assessment.affordabilityAssessmentElements.forEach(element => {
                element.affordabilityAssessmentGroupings.forEach(group => {
                    group.affordabilityAssessmentItems.forEach(item => {
                        var existingItem = this.affordabilityAssessmentAmountLookup.affordabilityAssessmentItems.filter(amount => amount.sourceAffordabilityAssessmentItemId === item.affordabilityAssessmentItemId)[0];
                        item.itemAmount = existingItem?.itemAmount ?? 0;
                    })
                })
            })
        });
        this.affordabilityAssessmentList[0].note = this.affordabilityAssessmentAmountLookup.note;
    }

    public async saveAffordabilityAssessment() {
        this.affordabilityAssessmentList.forEach(assessment => {
            assessment.clientId = this.clientId;
        });

        this.createAffordabilityAssessmentCommand.affordabilityAssessments = this.affordabilityAssessmentList;
        this.createAffordabilityAssessmentCommand.sourceLoanApplicationId = this.loanApplicationId;

        const createAffordabilityAssessmentResponse = await this.clientAffordabilityAssessmentsApiClient.createAffordabilityAssessment(this.createAffordabilityAssessmentCommand!.toJSObject());
        if (createAffordabilityAssessmentResponse.data.success) {
            NotifyUtils.add("Affordability Assessment Saved", "You have successfully saved this affordability assessment.",
                "success" as any, NotificationDuration.Standard);
            this.affordabilityAssessmentList = new List(Platform.AffordabilityAssessmentLookup);
            this.createAffordabilityAssessmentCommand = new Clients.CreateAffordabilityAssessmentCommand();
            this.isAffordabilityAssessmentSubmittedInd = true;
        } else {
            NotifyUtils.add(TextConstants.Titles.ErrorServerSide, "Failed to Save Affordability Assessment.",
                "danger" as any, NotificationDuration.Standard);
        }
    }
}`,
      talkThrough:
        "The view model loads the client-specific list of assessment elements/groupings/items (already shaped per that client's own configuration) alongside any previously saved amounts for the current loan application, then walks the nested structure to merge the two — matching saved amounts back onto their source item by id — so a returning client sees their own prior inputs pre-filled. On save, it flattens the same nested list back into the command payload the API expects, and resets local state once the save succeeds so the form is ready for a fresh assessment.",
    },
    {
      label: 'Frontend UI — rendering the dynamic form',
      language: 'tsx',
      code: `import React from 'react';
import { UI } from '@internal/mvvm-react';
import { observer } from 'mobx-react';
import { TextConstants } from '../../../../../Common/TextConstants';
import { NumberFormat } from '@internal/mvvm-core/dist/NumberUtils';
import { SpecificClientTextConstants } from '../../SpecificClientTextConstants';
import CollapsibleCard from '../../../../../App/Components/CollapsibleCard';
import SelectAffordabilityAssessmentComponentVM from './SelectAffordabilityAssessmentComponentVM';

interface ISelectAffordabilityAssessmentComponentProps {
    viewModel: SelectAffordabilityAssessmentComponentVM;
    onSave: () => void;
    onPrevious: () => void;
}

@observer
export default class SelectAffordabilityAssessmentComponent extends React.Component<ISelectAffordabilityAssessmentComponentProps> {

    private GenerateAffordabilityAssessmentComponent() {
        const AA_Array = this.props.viewModel.affordabilityAssessmentList;
        const myArrCreatedFromMap = AA_Array.map(assessment => (
            <div>
                <UI.GridLayout md={2}>
                    <div className={'p-2'}>
                        <UI.GridLayout md={1}>
                            {assessment.affordabilityAssessmentElements.map(element => (
                                <div>
                                    {element.affordabilityAssessmentGroupings.map(group => (
                                        <div>
                                            <p className={'inTextTitle'}><b>{group.groupingLabel}</b></p>
                                            {group.affordabilityAssessmentItems.map(item => (
                                                <div>
                                                    <UI.FormGroup
                                                        label={item.itemLabel}
                                                        bind={item.meta.itemAmount}
                                                        numProps={{ format: NumberFormat.CurrencyDecimals }}
                                                        onBlur={() => item.meta.itemAmount.value *= item.meta.amountSymbol.value}
                                                    />
                                                </div>
                                            ))}
                                            <UI.FormGroup
                                                label={group.groupingTotalNameCalculated}
                                                isReadOnly display={group.meta.groupingTotalAmountCalculated}
                                                numProps={{ format: NumberFormat.CurrencyDecimals }}
                                            />
                                        </div>
                                    ))}
                                    <UI.FormGroup
                                        label={element.elementTotalNameCalculated}
                                        isReadOnly display={element.meta.elementTotalAmountCalculated}
                                        numProps={{ format: NumberFormat.CurrencyDecimals }}
                                    />
                                </div>
                            ))}
                            <UI.FormGroup
                                label={assessment.affordabilityAssessmentTotalName}
                                isReadOnly display={assessment.meta.affordabilityAssessmentTotalAmountCalculated}
                                className={assessment.affordabilityAssessmentTotalAmountCalculated > 0 ? 'positiveAmount' : 'negativeAmount'}
                                numProps={{ format: NumberFormat.CurrencyDecimals }}
                            />
                            <UI.FormGroup
                                label={SpecificClientTextConstants.Labels.SourcesOfOtherIncome}
                                bind={assessment.meta.note}
                                input={{ rows: 3 }}
                            />
                        </UI.GridLayout>
                    </div>
                </UI.GridLayout>
            </div>
        ));

        return <div>{myArrCreatedFromMap}</div>;
    }

    public render() {
        const viewModel = this.props.viewModel;

        return (
            <div>
                <UI.Loader task={viewModel.taskRunner}>
                    <CollapsibleCard title={TextConstants.Titles.AffordabilityAssessmentInput} isExpanded={true}>

                        {viewModel.affordabilityAssessmentList.length > 0 &&
                            this.GenerateAffordabilityAssessmentComponent()
                        }

                        {viewModel.affordabilityAssessmentList.length === 0 &&
                            <div className="col-md-12 text-center">
                                <p>{TextConstants.GeneralText.UnableToLoadDetails}</p>
                            </div>
                        }
                    </CollapsibleCard>

                    <div>
                        <UI.Button
                            onClick={() => this.props.onSave()}
                            variant={"primary"} isOutline className="float-right ml-3 col-md-1"
                        >{TextConstants.Buttons.Save}</UI.Button>

                        <UI.Button
                            onClick={() => this.props.onPrevious()}
                            variant="primary" isOutline className="col-md-1"
                        >{TextConstants.Buttons.Previous}</UI.Button>
                    </div>
                </UI.Loader>
            </div>
        );
    }
}`,
      talkThrough:
        "The component never hard-codes a single field — it maps over whatever elements, groupings, and items came back from the view model and renders a bound input per item, a read-only calculated total per grouping, and a read-only calculated total per element, all driven entirely by the data. Because the levels and their labels are whatever the client configured, the same component renders a completely different-looking form for a different client without any code change.",
    },
  ],
}

export default project
