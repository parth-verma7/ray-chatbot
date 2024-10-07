import { Url } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';
import React from 'react';

const BUTTON_VARIANT = {
  primary: 'bg-black text-white text-center font-semibold px-4 py-2 hover:bg-slate-700 min-w-28'
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: keyof typeof BUTTON_VARIANT;
  href?: Url;
}

export default function Button(props: ButtonProps) {
  const { variant = 'primary' } = props;
  let ELEMENT: any = 'button';
  if(props?.href) {
    ELEMENT = Link;
  }
  return (
    <ELEMENT
      className={`${BUTTON_VARIANT[variant]}`}
      {... (props.href ? { href: props.href! } : {})}
    >
      {props?.children}
    </ELEMENT>
  );
}