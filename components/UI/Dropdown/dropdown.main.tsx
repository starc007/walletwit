import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  wrapperClassName?: string;
};

type DropdownItemProps = {
  children: React.ReactNode;
};

export const DropdownItem = (props: DropdownItemProps) => {
  return <MenuItem>{props.children}</MenuItem>;
};

export const DropDownButton = (props: {
  children: React.ReactNode;
  buttonClassName?: string;
}) => {
  return (
    <MenuButton
      className={clsx("inline-flex items-center", props.buttonClassName)}
    >
      {props.children}
    </MenuButton>
  );
};

export const DropDownContent = (props: {
  children: React.ReactNode;
  menuClassName?: string;
}) => {
  return (
    <MenuItems
      transition
      className={clsx(
        "w-52 absolute top-10 text-left right-0 rounded-md border border-gray-200 bg-white z-50 px-3 py-2 text-sm/6 text-primary transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0",
        props.menuClassName
      )}
    >
      {props.children}
    </MenuItems>
  );
};

export const Dropdown = (props: Props) => {
  return (
    <div className={clsx("relative text-right", props.wrapperClassName)}>
      <Menu>{props.children}</Menu>
    </div>
  );
};
