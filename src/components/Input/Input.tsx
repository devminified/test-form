import React, {
  MutableRefObject,
  ReactElement,
  ReactNode,
  Ref,
  TextareaHTMLAttributes,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

import classNames from "classnames";
import "./input.scss";

interface inputProfile
  extends Partial<React.InputHTMLAttributes<any>>,
    Partial<TextareaHTMLAttributes<any>> {
  value?: string;
  hasIcon?: boolean;
  isPicker?: boolean;
  hasLabel?: boolean;
  isLoading?: boolean;
  Cplaceholder?: string;
  disableFloatingLabel?: boolean;
  limit?: number;
  validations?: {
    type?: string;
    noMultipeSpace?: boolean;
    noSpace?: boolean;
  }[];
  renderLoader?: () => any;
  materialDesign?: boolean;
  className?: string;
  inputClasses?: string;
  labelClasses?: string;
  icon?: string | ReactElement;
  rightIcon?: string | ReactElement;
  prefixElement?: string | ReactElement;
  label?: string | ReactElement | ReactNode;
  touched?: any;
  error?: any;
  dataLpignore?: string;
  hasLimit?: boolean;
  min?: number;
  inputRef?: MutableRefObject<any>;
}
function FocusInput(props: inputProfile, ref: Ref<any>) {
  const {
    validations = [],
    icon,
    rightIcon,
    label,
    labelClasses,
    prefixElement,
    isPicker,
    hasLimit = false,
    value: propValue,
    min,
    inputRef,
    materialDesign,
    ...rest
  } = props;
  const [value, setValue] = useState<string>(propValue || "");
  const [focus, setFocus] = useState<boolean>(Boolean(propValue));

  useEffect(() => {
    if (!Boolean(propValue) && !focus) {
      setValue("");
      setFocus(false);
    } else {
      if (propValue != null) setValue(propValue);
      setFocus(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propValue]);

  const isLoading = props.isLoading || false;
  const animationLess = props.disableFloatingLabel;
  const hasLabel = props.hasLabel === undefined && true;
  const inputType = props.type || "text";
  const limit = props.limit ? props.limit : inputType === "text" ? 120 : 250;

  const inputFocused = () => {
    setFocus(true);
  };
  const setInputFocus = (isTrue = true) => {
    setFocus(isTrue);
  };

  const inputBlurred = (e: any) => {
    setFocus(Boolean(value && value.trim().length));
    if (props.onBlur) {
      props.onBlur(e);
    }
  };

  const excuteValidation = (value: any) => {
    let afterValidation = value;
    if (!value) return value;
    validations.map((item) => {
      if (item.type === "alpha") {
        const reg = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
        if (reg.test(afterValidation)) {
          throw new Error("Only Alphabets");
        }
        if (/\d/.test(afterValidation)) {
          throw new Error("Only Alphabets");
        }
        if (/^\s+/.test(afterValidation)) {
          throw new Error("Only Alphabets");
        }
      }
      if (item.type === "number") {
        const reg = /^\d+(\.\d{0,2})?$/;
        if (!reg.test(afterValidation)) {
          throw new Error("Only number allowed");
        }
      }
      if (item.type === "phone") {
        // const reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        const reg = /^[+]?\d{0,}$/im;
        if (!reg.test(afterValidation)) {
          throw new Error('Only numbers or "+" and digits');
        }
      }
      if (item.noMultipeSpace) {
        afterValidation = afterValidation.replace(/ {1,}/g, " ");
      }
      if (item.noSpace) {
        afterValidation = afterValidation.replace(/ {0,}/g, "");
      }
      return null;
    });
    return afterValidation;
  };
  const onChange = (e: any) => {
    try {
      if (validations?.length > 0) {
        e.target.value = excuteValidation(e.target.value);
      }
      if (!hasLimit || !limit || e.target.value.length <= limit) {
        if (inputType === "number" && min != null) {
          const v = Number(e.target.value);
          if (!isNaN(v) && v >= min) {
            setValue(e.target.value);
            props.onChange?.(e);
          }
        } else {
          setValue(e.target.value);
          props.onChange?.(e);
        }
      }
    } catch (e) {
      // console.error(e);
    }
  };

  const cols = props.cols || 30;
  const rows = props.rows || 10;
  let inputElement = null;
  useImperativeHandle(
    inputRef,
    () => {
      return {
        setInputFocus,
        setValue,
        onChange: props.onChange,
      };
    },
    [value]
  );
  switch (inputType) {
    case "textarea":
      inputElement = (
        <textarea
          id={props.id}
          name={props.name}
          className={`form-control ${props.className || ""}`}
          onChange={onChange}
          style={{ ...props.style, fontWeight: 400 }}
          cols={cols}
          rows={rows}
          onFocus={inputFocused}
          onBlur={inputBlurred}
          value={value}
          disabled={props?.disabled}
          ref={ref}
          placeholder={props.placeholder}
        />
      );
      break;
    default:
      inputElement = (
        <div className="input-parent">
          <input
            {...rest}
            id={props.id}
            name={props.name}
            onChange={onChange}
            type={inputType}
            style={{ ...props.style }}
            onFocus={inputFocused}
            onBlur={inputBlurred}
            value={value}
            placeholder={props?.placeholder}
            disabled={props?.disabled}
            ref={ref}
            data-lpignore={props.dataLpignore}
            // autoComplete={props.autocomplete}
            onKeyUp={props.onKeyUp}
            className={`form-control ${props.className || ""}`}
            // {...register?.(props.name)}
          />
          <span className="c-label">{props?.Cplaceholder}</span>
        </div>
      );
  }

  const iClasses = classNames("text-input", props.inputClasses || "", {
    "prefix-element": prefixElement,
    "emoji-picker": isPicker,
    "materialized-input": materialDesign,
    "ico-input": icon,
    "input-active": focus && !animationLess,
    "no-label": !label,
    "disable-floating-label": animationLess,
    "prefix-icon": prefixElement,
    "affix-icon": rightIcon,
  });

  const loader = () => {
    if (isLoading) {
      if (props.renderLoader) {
        return props.renderLoader();
      }
      return (
        <div
          className="loader-circule"
          style={{
            right: "15px",
            left: "unset",
            top: "50%",
            borderTopColor: "#898989",
            transform: "translateY(-50%)",
          }}
        ></div>
      );
    }
  };
  return (
    <div className={iClasses}>
      {hasLabel && (
        <label htmlFor={props.id} className={labelClasses}>
          {label}
        </label>
      )}
      {prefixElement && <div className="pre-fix"> {prefixElement}</div>}

      {icon && (
        <div className="icon">
          {typeof icon === "string" ? (
            <span className={`icon-${icon}`}></span>
          ) : (
            icon
          )}
        </div>
      )}
      {inputElement}
      {rightIcon && (
        <div className="rightIcon">
          {typeof icon === "string" ? (
            <span className={`icon-${rightIcon}`}></span>
          ) : (
            rightIcon
          )}
        </div>
      )}
      {hasLimit && limit && (
        <div className="form-word-count">
          {limit - value?.length || 0} characters
        </div>
      )}
      {loader()}
      {props.touched && props.error && (
        <>
          <div
            id="title-error" className="error-msg is-invalid d-block"
          >
            <div>{props.error}</div>
          </div>
        </>
      )}
    </div>
  );
}

export default forwardRef(FocusInput);
