import type { AnchorHTMLAttributes, ReactNode } from 'react';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
    action: string;
    children: ReactNode;
    label: string;
    zone: string;
};

export function TrackedCTA({
    action,
    children,
    label,
    zone,
    ...anchorProps
}: Props) {
    return (
        <a
            {...anchorProps}
            data-cta-action={action}
            data-cta-label={label}
            data-cta-zone={zone}
        >
            {children}
        </a>
    );
}
