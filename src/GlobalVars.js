import { css } from "@emotion/react";

export const LoadingSpinnerConfig = 
{
    css: css`position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%); z-index:3`,
    size: 100,
    color: '#00ff55',
    speedMultiplier: 1.25,
}

export const storageTokenKey = "golf";