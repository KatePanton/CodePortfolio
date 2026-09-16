import type { BriefProjectDetail } from '../types'

const detail: BriefProjectDetail = {
  media: {
    kind: 'screenshots',
    screenshots: [
      {
        src: '/projects/cv-builder/sortable-list-states.png',
        alt: 'Interests list in view mode with drag handles, and References list in edit mode with remove/edit icons',
        caption: 'The shared Sortable component in its two modes — drag-to-reorder (Interests) and remove/edit (References)',
      },
    ],
  },
  snippets: [
    {
      label: 'Sortable',
      language: 'tsx',
      talkThrough:
        "The shared list component every list-backed section (Skills, Interests, References, and three others built by a colleague) is built on. `@dnd-kit`'s `DndContext`/`useSortable` drive drag-to-reorder, with `arrayMove` computing the new order and a `router.post` (Inertia) persisting it. A view/edit toggle swaps each row between a drag handle (view mode) and remove/edit icon buttons (edit mode) — removing posts a `router.delete`; editing or adding opens a `Dialog` whose contents are supplied by the consuming section through a render-prop, `children({ selected, onClose })`, so `Sortable` never needs to know what a section's own form looks like.",
      code: `import { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useSortable, SortableContext, arrayMove } from '@dnd-kit/sortable';
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers';
import { CSS } from '@dnd-kit/utilities';
import { faList, faSort, faArrowDownArrowUp, faCircleMinus, faEdit, faPlus } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@/Components/Elements/Button';
import React from 'react';
import {router} from "@inertiajs/react";
import {route, ValidRouteName} from "ziggy-js";
import Dialog from "@/Components/Elements/Dialog";

export type SortableItem = {
  id: string;
  title: string;
  description: string;
};

type SortableProps = {
  listContent: SortableItem[];
  listTitle: string;
  reorderRouteName: ValidRouteName;
  removeRouteName: ValidRouteName;

  children?: (props: {
    selected: string | null;
    onClose: () => void;
  }) => React.ReactNode;

};

export default function Sortable({
  listTitle,
  listContent,
  reorderRouteName,
  removeRouteName,
  children,
}: SortableProps) {
  const [userData, setUserUserData] = useState<SortableItem[]>(listContent);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);
  const [currentItem, setCurrentItem] = useState<SortableItem | null>(null);

  React.useEffect(() => {
    setUserUserData(listContent);
  }, [listContent]);

  const toggleEditable = () => setEditMode((prev) => !prev);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!active || !over) return;
    if (active.id !== over.id) {
      setUserUserData((items) => {
        const oldIndex = items.findIndex((item: SortableItem) => item.id === active.id);
        const newIndex = items.findIndex((item: SortableItem) => item.id === over.id);
        handleOrderChange(arrayMove(items, oldIndex, newIndex)); // Inform parent of the change
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleOrderChange = (items: SortableItem[]) => {
    router.post(
      route(reorderRouteName),
      { ids: items.map((item) => item.id) },
    );
  };

  const handleRemove = (id: string) => {
    setUserUserData((items) => items.filter((item) => item.id !== id));
    router.delete(route(removeRouteName, {id}), {
      preserveScroll: true,
    });
  };

  const handleEdit = (id: string) => {
    setCurrentItem(userData.find(item => item.id === id) || null);
    setOpenModal(true);
  };

  const handleAdd = () => {
    setCurrentItem(null);
    setOpenModal(true);
  };


  const UserItem = ({ item }: { item: SortableItem }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });
    const style = { transform: CSS.Transform.toString(transform), transition, cursor: 'grab' };
    if (!editMode) {
      return (
        <div
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          className="flex flex-row items-center justify-between gap-6"
          style={style}
        >
          <div className="bg-layer-01 text-text-primary flex w-full flex-col justify-center gap-2 rounded-lg p-12">
            <h6>{item.title}</h6> <p>{item.description}</p>
          </div>
          <Button variant="tonal" color="neutral" size="tiny" iconLeft={faSort}></Button>
        </div>
      );
    } else {
      return (
        <div className="flex flex-row items-center justify-between gap-6">
          <Button variant="ghost" color="red" size="tiny" iconLeft={faCircleMinus} onClick={() => handleRemove(item.id)}></Button>
          <div className="bg-layer-01 text-text-primary flex w-full flex-col justify-center gap-2 rounded-lg p-12">
            <h6>{item.title}</h6> <p>{item.description}</p>
          </div>
          <Button variant="ghost" color="neutral" size="tiny" iconLeft={faEdit} onClick={() => handleEdit(item.id)}></Button>
        </div>
      );
    }
  };

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="border-b-border-subtle flex w-full flex-row items-center justify-between gap-6 border-b-1 pb-6">
        <h3 className="text-primary" style={{ fontSize: '24px', fontWeight: 700 }}>
          <FontAwesomeIcon icon={faList} className="mr-8" /> {listTitle}
        </h3>
        <ChangeViewButton edit={editMode} toggleEditable={toggleEditable} />
      </div>
      {userData && (
        <DndContext modifiers={[restrictToVerticalAxis, restrictToParentElement]} onDragEnd={handleDragEnd}>
          <SortableContext items={userData} disabled={editMode}>
            {userData?.map((item: SortableItem) => <UserItem key={item.id} item={item} />)}
          </SortableContext>
        </DndContext>
      )}
      <Button fullWidth variant="outline" size="tiny" color="neutral" onClick={handleAdd} iconLeft={faPlus}>
        Add New
      </Button>

      {children && (
        <Dialog isOpen={openModal} onClose={() => setOpenModal(false)}>
          {children({
            selected: currentItem ? currentItem.id : null,
            onClose: () => setOpenModal(false),
          })}
        </Dialog>
      )}

    </div>
  );
}

const ChangeViewButton = ({ edit, toggleEditable }: { edit: boolean; toggleEditable: () => void }) => {
  return (
    <>
      {!edit ? (
        <Button variant="tonal" color="neutral" size="tiny" iconLeft={faEdit} onClick={toggleEditable}></Button>
      ) : (
        <Button variant="tonal" color="neutral" size="tiny" iconLeft={faArrowDownArrowUp} onClick={toggleEditable}></Button>
      )}
    </>
  );
};
`,
    },
    {
      label: 'Section index (generic)',
      language: 'tsx',
      talkThrough:
        "Three of the CV's list-backed sections — Skills, Interests, and References — each have their own `index.tsx`, and all three are structurally identical: map the section's own data to `Sortable`'s generic `SortableItem[]` shape, pass a reorder/remove route name, and use the `selected`/`onClose` render-prop arguments to decide whether the popped-up form should be a create form or an edit form for the clicked item. This snippet is a genericized stand-in for that shared shape — `Section`/`SectionItem` here stands in for `Skill`/`SkillData`, `Interest`/`InterestData`, or `Reference`/`ReferenceData` in the real files.",
      code: `import React from 'react';
import Sortable, { SortableItem } from '../../Sortable';
import SectionModalForm from './SectionModalForm';

export default function Section({ items }: { items: App.Data.Routes.User.CV.SectionData[] }) {
  const listContent: SortableItem[] = items.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description ?? '',
  }));

  return (
    <div id="section">
      <Sortable
        listTitle="Section"
        listContent={listContent}
        reorderRouteName="cv.section.reorder"
        removeRouteName="cv.section.delete"
      >
        {({ selected, onClose }) => {
          const item = selected ? items.find((i) => i.id === selected) : undefined;
          return item ? (
            <SectionModalForm item={item} onClose={onClose} />
          ) : (
            <SectionModalForm itemsLength={items.length} onClose={onClose} />
          );
        }}
      </Sortable>
    </div>
  );
}
`,
    },
    {
      label: 'Section form (generic)',
      language: 'tsx',
      talkThrough:
        "Same genericization applied to the three `*ModalForm.tsx` components. All three use Inertia's `useForm` the same way — `put` to create, `patch` to update, disabled while `!isDirty` — and differ only in field set. Rather than pick one real form (and lose the others), the fields shown here are one of each input type actually used across the three: a plain text `Input` (every section's title field), a `Textarea` (References' comment field), and a 0-5 `range` slider (Skill's rating field). No single real section has all three fields together — this is a combined view of the range of inputs the pattern supports, not a copy of one form.",
      code: `import React from 'react';
import { useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import Card from '@/Components/Groups/Cards/Card';
import Input from '@/Components/Elements/Form/Input';
import Textarea from '@/Components/Elements/Form/Textarea';
import CancelOrSubmitButtons from '@/Components/Groups/CancelOrSubmitButtons';

type SectionModalFormProps =
  | { item?: never; itemsLength: number; onClose: () => void }
  | { item: App.Data.Routes.User.CV.SectionData; itemsLength?: never; onClose: () => void };

const SectionModalForm = ({ item, onClose, itemsLength }: SectionModalFormProps) => {
  const isNew = !item;
  const { data, setData, isDirty, put, patch } = useForm(
    item
      ? { id: item.id, title: item.title, comment: item.comment ?? '', rating: item.rating ?? 0, order: item.order }
      : { title: '', comment: '', rating: 0, order: (itemsLength ?? 0) + 1 }
  );

  const handleSave = () => {
    if (isNew) {
      put(route('cv.section.add'), { preserveScroll: true, onSuccess: () => onClose() });
    } else {
      patch(route('cv.section.update', { id: item.id }), { preserveScroll: true, onSuccess: () => onClose() });
    }
  };

  return (
    <Card title={isNew ? 'Create Item' : 'Edit Item'}>
      <div className="flex flex-col gap-4">
        {/* Plain text input — every section's title/name field looks like this */}
        <Input label="Title" value={data.title} onChange={(e) => setData('title', e.target.value)} placeholder="Enter a title" />

        {/* Free-text textarea — used where a section takes a longer, unformatted note */}
        <Textarea label="Comment" value={data.comment} onChange={(e) => setData('comment', e.target.value)} placeholder="Enter a comment" />

        {/* Range slider — used where a section records a 0-5 rating */}
        <div>
          <span className="text-sm text-gray-500">Level</span>
          <input
            type="range"
            min={0}
            max={5}
            step={1}
            value={data.rating}
            onChange={(e) => setData('rating', Number(e.target.value))}
            className="w-full accent-slate-500"
          />
        </div>
      </div>
      <CancelOrSubmitButtons onCancel={onClose} onSubmit={handleSave} submitText={isNew ? 'Create' : 'Save'} disabled={!isDirty} />
    </Card>
  );
};

export default SectionModalForm;
`,
    },
    {
      label: 'Section preview (generic)',
      language: 'tsx',
      talkThrough:
        "And the same genericization applied to the three `*Preview.tsx` components that render inside the read-only CV preview. Structurally identical — sort by `order`, bail out to `null` if the list is empty, map over the rest — but the three real previews actually look quite different: Interests renders as a wrapped row of pill/chip spans, Skill renders a 0-5 star rating per item, and References renders each entry as a pastel-background card of text. This snippet shows the shared shape rather than picking one of those three visual treatments.",
      code: `export default function SectionPreview({ items }: { items: App.Data.Routes.User.CV.SectionData[] }) {
  const sortedItems = items?.sort((a, b) => a.order - b.order);

  if (!sortedItems || sortedItems.length === 0) {
    return null;
  }

  return (
    <div className="cv-section cv-section-generic">
      <h3
        className="cv-section-title border-border-subtle text-brand-primary mb-8 border-b"
        style={{
          fontWeight: 'bold',
          fontSize: '1.1rem',
        }}
      >
        Section
      </h3>
      <div className="cv-section-list space-y-6">
        {sortedItems.map((item, idx) => (
          <div key={idx}>{item.title}</div>
        ))}
      </div>
    </div>
  );
}
`,
    },
  ],
}

export default detail
