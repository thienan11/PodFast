import { ComponentProps, FC } from "react";

export const HamburgerMenuIcon: FC<ComponentProps<"svg">> = (props) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    {...props}
  >
    <rect y="4" width="24" height="2" rx="1" />
    <rect y="11" width="24" height="2" rx="1" />
    <rect y="18" width="24" height="2" rx="1" />
  </svg>
);

export const GoogleLogo: FC<ComponentProps<"svg">> = (props) => (
  <svg
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    {...props}
  >
    <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
  </svg>
);

export const GoogleLogoColored: FC<ComponentProps<"svg">> = (props) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_1276_2)">
      <path
        d="M16 8.19187C16 7.65157 15.9467 7.09385 15.8577 6.57099H8.15782V9.65589H12.5679C12.3901 10.6493 11.8033 11.5208 10.9319 12.0785L13.5638 14.0828C15.1109 12.6711 16 10.6145 16 8.19187Z"
        fill="#4280EF"
      />
      <path
        d="M8.15782 16C10.3629 16 12.2123 15.2854 13.5638 14.0654L10.9319 12.0785C10.2028 12.5665 9.26035 12.8454 8.15782 12.8454C6.0239 12.8454 4.22784 11.4336 3.56988 9.55132L0.866907 11.5905C2.25396 14.292 5.06363 16 8.15782 16Z"
        fill="#34A353"
      />
      <path
        d="M3.56988 9.53389C3.23201 8.54045 3.23201 7.45986 3.56988 6.46641L0.866907 4.40981C-0.288969 6.67556 -0.288969 9.34217 0.866907 11.5905L3.56988 9.53389Z"
        fill="#F6B704"
      />
      <path
        d="M8.15782 3.17236C9.3137 3.15493 10.4518 3.59065 11.2876 4.37495L13.6171 2.07434C12.1412 0.714887 10.1851 -0.0171247 8.15782 0.000304184C5.06363 0.000304184 2.25396 1.70833 0.866907 4.40981L3.56988 6.46641C4.22784 4.56667 6.0239 3.17236 8.15782 3.17236Z"
        fill="#E54335"
      />
    </g>
    <defs>
      <clipPath id="clip0_1276_2">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
