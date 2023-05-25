import React, { useMemo } from "react";
import { useTreeItem } from "@mui/lab/TreeItem";
import clsx from "clsx";
import Bar from "./Bar";

import {
  ServiceTitle,
  ItemAttrs,
  ItemOperation,
  TitleWrap,
  ItemLeft,
  ItemRight,
} from "./styles";

const Item = React.forwardRef((props, ref) => {
  const {
    classes,
    className,
    event,
    minDate,
    maxDate,
    totalDuration,
    nodeId,
    icon: iconProp,
    expansionIcon,
    displayIcon,
  } = props;

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    preventSelection,
  } = useTreeItem(nodeId);

  const icon = iconProp || expansionIcon || displayIcon;

  const handleMouseDown = (event) => {
    preventSelection(event);
  };

  const handleExpansionClick = (event) => {
    handleExpansion(event);
  };

  const label = useMemo(() => {
    let str;
    switch (true) {
      case event.attrs["aspecto.calc.class"] === "database":
        str = (
          <>
            <ServiceTitle>{event.attrs["service.name"]}</ServiceTitle>
            &nbsp;
            <ItemAttrs>
              HTTP&nbsp;{event.attrs["db.system"]} {event.attrs["db.operation"]}
            </ItemAttrs>
            &nbsp;
            <ItemOperation>{event.attrs["db.name"]}</ItemOperation>
          </>
        );
        break;

      case event.attrs["aspecto.calc.class"] === "messaging":
        str = (
          <>
            <ServiceTitle>{event.attrs["service.name"]}</ServiceTitle>
            &nbsp;
            <ItemAttrs>HTTP&nbsp;{event.attrs["messaging.system"]}</ItemAttrs>
            &nbsp;
            <ItemOperation>
              {event.attrs["messaging.destination"]}
            </ItemOperation>
          </>
        );
        break;

      case event.attrs["aspecto.calc.class"] === "http":
      default:
        str = (
          <>
            <ServiceTitle>{event.attrs["service.name"]}</ServiceTitle>&nbsp;
            <ItemAttrs>HTTP&nbsp;{event.attrs["http.method"]}</ItemAttrs>
            &nbsp;
            <ItemOperation>{event.operationName}</ItemOperation>
          </>
        );
        break;
    }

    return str;
  }, [event]);

  return (
    <div
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      onMouseDown={handleMouseDown}
      ref={ref}
    >
      <ItemLeft>
        <div onClick={handleExpansionClick} className={classes.iconContainer}>
          {icon}
        </div>

        <TitleWrap>{label}</TitleWrap>
      </ItemLeft>
      <ItemRight>
        <Bar
          event={event}
          minDate={minDate}
          maxDate={maxDate}
          totalDuration={totalDuration}
        />
      </ItemRight>
    </div>
  );
});

export default Item;
