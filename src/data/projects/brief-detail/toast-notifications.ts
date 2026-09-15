import type { BriefProjectDetail } from '../types'

const detail: BriefProjectDetail = {
  media: {
    kind: 'video',
    video: {
      src: '/projects/toast-notifications/demo.mp4',
      alt: 'Demo of the themed toast notification variants in use',
      caption: 'The notification, quick-action, context-action, and dual-action toast variants',
    },
  },
  snippets: [
    {
      label: 'Toast wrapper',
      language: 'tsx',
      talkThrough:
        "A thin wrapper around `react-toastify`'s `toast()` call. `toastVariants` drives a shared `renderIcon` helper — a themed icon in a coloured background chip — reused by every toast type below. `ToastProps` re-exposes the subset of `react-toastify`'s own options callers are allowed to override, and `handleToastClose` runs an optional callback before dismissing, so an action button can fire its handler and close the toast in one step.",
      code: `import React from "react";
import { Id, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationCircle,
  faInfoCircle,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";

interface CustomToastProps {
  toastProps?: ToastProps;
  children?: React.ReactNode;
}

export type toastVariants =
  | "default"
  | "info"
  | "success"
  | "warning"
  | "error";

export type ToastProps = {
  position?:
    | "top-right"
    | "top-center"
    | "top-left"
    | "bottom-right"
    | "bottom-center"
    | "bottom-left";
  autoClose?: number | false;
  closeOnClick?: boolean;
  hideProgressBar?: boolean;
  newestOnTop?: boolean;
  pauseOnHover?: boolean;
  pauseOnFocusLoss?: boolean;
  theme?: "light" | "dark" | "colored";
};

export const renderIcon = (variant: toastVariants) => {
  switch (variant) {
    case "info":
      return (
        <div className="bg-alert-info-background flex items-center justify-center rounded-sm p-5">
          <FontAwesomeIcon icon={faInfoCircle} className="text-alert-info" />
        </div>
      );
    case "success":
      return (
        <div className="bg-alert-success-background flex items-center justify-center rounded-sm p-5">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-alert-success"
          />
        </div>
      );
    case "warning":
      return (
        <div className="bg-alert-warning-background flex items-center justify-center rounded-sm p-5">
          <FontAwesomeIcon
            icon={faExclamationCircle}
            className="text-alert-warning"
          />
        </div>
      );
    case "error":
      return (
        <div className="bg-alert-error-background flex items-center justify-center rounded-sm p-5">
          <FontAwesomeIcon icon={faWarning} className="text-alert-error" />
        </div>
      );
    default:
      return;
  }
};

export function handleToastClose(toastId: Id, onClick?: () => void) {
  if (onClick) {
    onClick();
  }
  toast.dismiss(toastId);
}

export default function CustomToast({
  toastProps,
  children,
}: CustomToastProps) {
  return toast(<div>{children}</div>, {
    className: "border-border-subtle border-1 shadow-sm flex min-w-fit ",
    ...toastProps,
  });
}
`,
    },
    {
      label: 'Notification toast',
      language: 'tsx',
      talkThrough: 'The simplest variant — an icon and a message, no action. Every other toast type builds on the same `CustomToast` call and `renderIcon` helper.',
      code: `import CustomToast, { renderIcon, ToastProps, toastVariants } from "./Toast";

interface NotificationToastProps {
  message: string;
  variant?: toastVariants;
  toastProps?: ToastProps;
}

export default function NotificationToast({
  message,
  variant,
  toastProps,
}: NotificationToastProps) {
  CustomToast({
    toastProps: toastProps,
    children: (
      <div className="flex flex-row items-center gap-6">
        <div>{renderIcon(variant)}</div>

        <p className="medium text-secondary items-center pr-8">{message}</p>
      </div>
    ),
  });
}
`,
    },
    {
      label: 'Quick action toast',
      language: 'tsx',
      talkThrough:
        "Adds a single inline action button next to the message, for a lightweight one-tap response. Clicking it runs the caller's `onClick` and dismisses the toast via the shared `handleToastClose` helper.",
      code: `import Button from "@/Components/Elements/Button";
import CustomToast, {
  handleToastClose,
  renderIcon,
  ToastProps,
  toastVariants,
} from "./Toast";

interface QuickActionToastProps {
  message: string;
  buttonText: string;
  variant?: toastVariants;
  onClick?: () => void;
  toastProps?: ToastProps;
}

export default function QuickActionToast({
  message,
  buttonText,
  variant,
  onClick,
  toastProps,
}: QuickActionToastProps) {
  const toastId = CustomToast({
    toastProps: toastProps,
    children: (
      <div className="flex w-full min-w-[360px] flex-row items-center gap-5 pr-8">
        {renderIcon(variant)}

        <p className="medium text-secondary items-center">{message}</p>

        <Button
          variant="tonal"
          onClick={() => handleToastClose(toastId, onClick)}
          size="small"
        >
          {buttonText}
        </Button>
      </div>
    ),
  });
}
`,
    },
    {
      label: 'Context action toast',
      language: 'tsx',
      talkThrough:
        "Same single-action shape as the quick-action toast, but stacks the button below the message instead of inline — for a longer message or a more deliberate action that shouldn't sit flush against the text.",
      code: `import Button from "@/Components/Elements/Button";
import CustomToast, {
  handleToastClose,
  renderIcon,
  ToastProps,
  toastVariants,
} from "./Toast";

interface ContextActionToastProps {
  message: string;
  buttonText: string;
  variant?: toastVariants;
  onClick?: () => void;
  toastProps?: ToastProps;
}

export default function ContextActionToast({
  message,
  buttonText,
  variant,
  onClick,
  toastProps,
}: ContextActionToastProps) {
  const toastId = CustomToast({
    toastProps: toastProps,
    children: (
      <div className="flex w-full flex-row items-start gap-5 pr-8">
        {renderIcon(variant)}

        <div className="flex flex-col gap-5">
          <p className="medium text-secondary flex min-h-[36px] items-center">
            {message}
          </p>

          <div>
            <Button
              variant="tonal"
              size="small"
              onClick={() => handleToastClose(toastId, onClick)}
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    ),
  });
}
`,
    },
    {
      label: 'Dual action toast',
      language: 'tsx',
      talkThrough:
        'Two buttons — a primary ("solid") and secondary ("tonal") action — for toasts that need to offer a choice, such as confirm/dismiss, rather than a single response.',
      code: `import Button from "@/Components/Elements/Button";
import CustomToast, {
  handleToastClose,
  renderIcon,
  ToastProps,
  toastVariants,
} from "./Toast";

interface DualActionToastProps {
  message: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  variant?: toastVariants;
  primaryOnClick?: () => void;
  secondaryOnClick?: () => void;
  toastProps?: ToastProps;
}

export default function DualActionToast({
  message,
  primaryButtonText,
  secondaryButtonText,
  variant,
  primaryOnClick,
  secondaryOnClick,
  toastProps,
}: DualActionToastProps) {
  const toastId = CustomToast({
    toastProps: toastProps,
    children: (
      <div className="flex w-full flex-row items-start gap-5 pr-8">
        {renderIcon(variant)}

        <div className="flex flex-col gap-5">
          <p className="medium text-secondary flex min-h-[36px] items-center">
            {message}
          </p>

          <div className="flex flex-row gap-4">
            <Button
              variant="solid"
              onClick={() => handleToastClose(toastId, primaryOnClick)}
              size="small"
            >
              {primaryButtonText}
            </Button>

            <Button
              variant="tonal"
              onClick={() => handleToastClose(toastId, secondaryOnClick)}
              size="small"
            >
              {secondaryButtonText}
            </Button>
          </div>
        </div>
      </div>
    ),
  });
}
`,
    },
  ],
}

export default detail
