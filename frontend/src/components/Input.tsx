import React, { FC, InputHTMLAttributes } from 'react';

type SimpleSpread<L, R> = R & Pick<L, Exclude<keyof L, keyof R>>;

type InputProps = SimpleSpread<
  InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
  {
    value: string | boolean;
    setValue: (value: string | boolean) => void;
    label?: string;
    variant?: keyof typeof VARIANT_STYLE;
    type: string;
  }
>;

const VARIANT_STYLE = {
  normal: ''
};

export const Input: FC<InputProps> = (props) => {
  const {
    name,
    value,
    setValue,
    label,
    variant = 'normal',
    placeholder,
    type
  } = props;
  if (['password', 'email', 'text'].includes(type)) {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label id={name} className="text-white font-medium text-lg pl-2">
            {label}
          </label>
        )}
        <input
          {...props}
          name={name}
          value={value as string}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          className={`bg-[#1a212d] border-2 border-[#161922] rounded-md p-2 text-white font-medium text-lg focus:outline-none placeholder:text-[#343a44] ${VARIANT_STYLE[variant]}`}
          placeholder={placeholder}
        />
      </div>
    );
  } else if (type === 'textarea') {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label id={name} className="text-white font-medium text-lg pl-2">
            {label}
          </label>
        )}
        <textarea
          {...props}
          name={name}
          value={value as string}
          rows={3}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          className="bg-[#1a212d] border-2 border-[#161922] rounded-md p-2 text-white font-medium text-lg focus:outline-none placeholder:text-[#343a44]"
          placeholder={placeholder}
        />
      </div>
    );
  } else if (type === 'checkbox') {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <div className="flex items-center">
            <div
              className={`h-6 w-6 border border-[#343a44] rounded relative ${
                value && 'bg-[#161922]'
              }`}
              onClick={() => setValue(!(value as boolean))}
            >
              {value && (
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="check"
                  className="absolute inset-1"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                  ></path>
                </svg>
              )}
            </div>
            <label id={name} className="text-white font-medium text-lg pl-2">
              {label}
            </label>
          </div>
        )}
      </div>
    );
  }
  return <></>;
};