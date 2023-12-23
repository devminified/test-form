import classNames from "classnames";
import React, { CSSProperties, ReactElement, ReactNode } from "react";
import SelectComponent, {
  ActionMeta,
  ControlProps,
  GroupBase,
  OptionProps,
  OptionsOrGroups,
  StylesConfig,
  components,
} from "react-select";
import "./select.scss";
export interface SelectProps<
  Option = unknown,
  IsMulti extends boolean = false
> {
  options?: OptionsOrGroups<unknown, GroupBase<unknown>> | undefined;
  placeholder?: string;
  size?: "x-small" | "small" | "medium" | "large";
  onChange?: (newValue: Option, actionMeta: ActionMeta<unknown>) => void;
  defaultValue?: IsMulti extends true
    ? OptionProps<Option, boolean>
    : OptionProps<Option, false>;
  value?: Option;
  name?: string;
  touched?: any;
  error?: any;
  onBlur?: any;
  width?: string | number;
  heigth?: string | number;
  type?: "default" | "seprated";
  className?: string;
  style?: CSSProperties;
  isSearchable?: boolean;
  styles?: StylesConfig;
  disabled?: boolean;
  isMulti?: boolean;
  isLoading?: boolean;
  onclick?: (...args: any) => void;
  onMenuOpen?: (...args: any) => void;
  onMenuClose?: (...args: any) => void;
  onMenuScrollToBottom?: (...args: any) => void;
  //   filterOption?:
  //     | ((option: FilterOptionOption<Option>, inputValue: string) => boolean)
  //     | null;
  components?: Record<string, any>;
  leftIcon?: ReactNode | ReactElement;
}
const RSelect: React.FC<SelectProps> = ({
  options,
  placeholder,
  size,
  value,
  defaultValue,
  name,
  error,
  type,
  touched,
  className,
  style,
  disabled = false,
  isMulti = false,
  isLoading = false,
  components: Cmponents = undefined,
  onMenuOpen,
  onMenuScrollToBottom,
  //   filterOption,
  onMenuClose,
  leftIcon,
  onBlur,
  ...rest
}: SelectProps) => {
  // const [isOpen, setIsOpen] = useState<boolean>(false);
  let sizeCls = "";
  switch (size) {
    case "large":
      sizeCls = "lg";
      break;
    case "small":
      sizeCls = "sm";
      break;
    case "x-small":
      sizeCls = "xs";
      break;
    default:
      break;
  }
  const Control = ({ children, ...props }: ControlProps) => (
    <components.Control {...{ ...props }}>
      {leftIcon} {children}
    </components.Control>
  );
  return (
    <div
      className={classNames(className, sizeCls, type || "default", {
        has__error: touched && error,
      })}
      style={style}
    >
      <SelectComponent
        isMulti={isMulti}
        onMenuOpen={onMenuOpen}
        onMenuClose={onMenuClose}
        className="react-select-container"
        name={name}
        isLoading={isLoading}
        components={Cmponents ? Cmponents : { Control }}
        isDisabled={disabled}
        classNamePrefix="react-select"
        menuPlacement="auto"
        openMenuOnFocus={true}
        defaultValue={defaultValue}
        placeholder={placeholder}
        value={value}
        options={options}
        onBlur={onBlur}
        onMenuScrollToBottom={onMenuScrollToBottom}
        // filterOption={filterOption}
        {...rest}
      />
      {error && touched && (
        <>
          <div id="title-error" className="error-msg is-invalid d-block">
            <div>{error}</div>
          </div>
        </>
      )}
    </div>
  );
};
export default RSelect;
