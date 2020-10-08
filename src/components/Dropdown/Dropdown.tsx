import React, { useState, useEffect } from 'react';
import { css, cx } from 'emotion';

import FocusLock from 'react-focus-lock';

import { palette } from '@guardian/src-foundations';
import {
    neutral,
    border,
    brandAlt,
    background,
} from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { from, until } from '@guardian/src-foundations/mq';

import { DropdownOptionType, Pillar } from '../../types';

type Props = {
    id: string;
    label: string;
    options: DropdownOptionType[];
    pillar: Pillar;
    onSelect: (value: string) => void;
};

const containerStyles = css`
    position: relative;
`;

const ulStyles = css`
    z-index: 2;
    list-style: none;
    border: 1px solid ${border.secondary};
    margin-left: -8px;
    padding: 0px;
    display: none;
    background-color: ${background.primary};

    position: absolute;

    ${until.tablet} {
        margin-top: 4px;
        border-radius: 0;
        overflow: auto;
    }

    ${from.tablet} {
        margin-top: 12px;
        border-radius: 3px;
    }
`;

const ulExpanded = css`
    display: block;
`;

const linkStyles = (disabled: boolean) => css`
    ${textSans.small()};
    text-align: left;
    color: ${disabled ? neutral[86] : neutral[46]};
    position: relative;
    text-decoration: none;
    margin-top: 1px;
    padding-top: 8px;
    padding-right: 30px;
    padding-bottom: 8px;
    padding-left: 8px;
    width: 100%;
    cursor: ${disabled ? 'default' : 'pointer'};
    background-color: white;
    border: none;

    ${!disabled &&
        `
    :hover {
      background-color: ${neutral[93]};
      text-decoration: underline;
    }

    :focus {
      text-decoration: underline;
    }
  `}
`;

const firstStyles = css`
    margin-top: 0;
`;

const activeStyles = (pillar: Pillar) => css`
    font-weight: bold;

    :after {
        content: '';
        border: 2px solid ${palette[pillar][400]};
        border-top: 0px;
        border-right: 0px;
        position: absolute;
        top: 12px;
        right: 12px;
        width: 8px;
        height: 4px;
        transform: rotate(-45deg);
    }
`;

const buttonStyles = css`
${textSans.small({ fontWeight: 'medium' })};
  display: block;
  cursor: pointer;
  background: none;
  border: none;
  /* Design System: The buttons should be components that handle their own layout using primitives  */
  line-height: 1.2;
  color: ${neutral[46]};
  transition: color 80ms ease-out;
  padding: 0px 10px 6px 0px;
  margin: 1px 0 0;
  text-decoration: none;

  :hover {
    /* color: ${brandAlt[400]}; */

    :after {
      transform: translateY(0) rotate(45deg);
    }
  }

  :after {
    content: "";
    display: inline-block;
    width: 5px;
    height: 5px;
    transform: translateY(-2px) rotate(45deg);
    border: 1px solid currentColor;
    border-left: transparent;
    border-top: transparent;
    margin-left: 5px;
    vertical-align: middle;
    transition: transform 250ms ease-out;
  }
`;

const expandedStyles = css`
    :hover:after {
        transform: translateY(-1px) rotate(-135deg);
    }
    :after {
        transform: translateY(1px) rotate(-135deg);
    }
`;

const labelStyles = css`
    ${textSans.small({ fontWeight: 'bold' })};
    color: ${neutral[46]};
`;

export const Dropdown = ({ id, label, options, pillar, onSelect }: Props) => {
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const dismissOnEsc = (event: KeyboardEvent) => {
            if (isExpanded && event.code === 'Escape') {
                setIsExpanded(false);
            }
        };

        document.addEventListener('keydown', dismissOnEsc, false);

        // Remove listener on unmount
        return () => document.removeEventListener('keydown', dismissOnEsc);
    }, [isExpanded]);

    useEffect(() => {
        const dismissOnClick = (event: MouseEvent) => {
            if (isExpanded) {
                event.stopPropagation();
                setIsExpanded(false);
            }
        };

        document.addEventListener('click', dismissOnClick, false);

        // Remove listener on unmount
        return () => document.removeEventListener('click', dismissOnClick);
    }, [isExpanded]);

    // needs to be unique to allow multiple dropdowns on same page
    // this should be unique because JS is single-threaded
    const dropdownID = `dropbox-id-${id}`;

    const activeLink = options.find(option => option.isActive);

    return (
        <div className={containerStyles}>
            <div className={labelStyles}>
                {label}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={cx(buttonStyles, isExpanded && expandedStyles)}
                    aria-controls={dropdownID}
                    aria-expanded={isExpanded ? 'true' : 'false'}
                >
                    {activeLink ? activeLink.title : 'Please select'}
                </button>
            </div>
            <FocusLock>
                <ul
                    id={dropdownID}
                    className={cx(ulStyles, isExpanded && ulExpanded)}
                >
                    {options.map((option, index) => (
                        <li key={option.title}>
                            <button
                                onClick={() => onSelect(option.value)}
                                className={cx(
                                    linkStyles(!!option.disabled),
                                    option.isActive && activeStyles(pillar),
                                    index === 0 && firstStyles,
                                )}
                                disabled={option.isActive || option.disabled}
                            >
                                {option.title}
                            </button>
                        </li>
                    ))}
                </ul>
            </FocusLock>
        </div>
    );
};
