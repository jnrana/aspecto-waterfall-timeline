import * as React from "react";
import { TreeView, TreeItem } from "@mui/lab";
import Item from "./Item";
import { Wrapper, Skeleton } from "./styles";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function ItemWrapper(props) {
  return <TreeItem ContentComponent={Item} ContentProps={props} {...props} />;
}

export default function TimelineWaterfall({ data }) {
  const [minDate, setMinDate] = React.useState(undefined);
  const [maxDate, setMaxDate] = React.useState(undefined);

  // const renderChild = (item, index) => {
  //   return (
  //     <ItemWrapper key={`node-${index}`} nodeId={item.spanId} event={item}>
  //       {/* {item?.children && item.children.length && renderChild(item, index)} */}
  //     </ItemWrapper>
  //   );
  // };

  React.useEffect(() => {
    setMaxDate(
      new Date(
        Math.max(
          ...data.map((item) => {
            const m1 =
              new Date(item.startTime).getTime() + item.duration / 1000000;
            return new Date(m1);
          })
        )
      )
    );

    setMinDate(
      new Date(
        Math.min(
          ...data.map((item) => {
            return new Date(item.startTime);
          })
        )
      )
    );
  }, [data]);

  const totalDuration = React.useMemo(() => {
    if (maxDate && minDate) return maxDate.getTime() - minDate.getTime();
    return 0;
  }, [maxDate, minDate]);

  return (
    <Wrapper>
      <Skeleton totalDuration={totalDuration} />
      <TreeView
        aria-label="icon expansion"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ flexGrow: 1, maxWidth: "100%" }}
      >
        {Object.keys(data).map((key, index) => {
          const item = data[key];
          return (
            <ItemWrapper
              key={`node-${index}`}
              nodeId={item.spanId}
              event={item}
              maxDate={maxDate}
              minDate={minDate}
              totalDuration={totalDuration}
            >
              {/* {item?.children && item.children.length && (
                <ItemWrapper
                  key={`node-nested-${index}`}
                  nodeId={item.spanId}
                  event={item}
                />
              )} */}
            </ItemWrapper>
          );
        })}
      </TreeView>
    </Wrapper>
  );
}
