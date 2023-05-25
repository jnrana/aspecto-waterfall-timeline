import { Box, Typography } from "@mui/material";
import styled from "styled-components";

export const TitleWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const TimelineBar = styled.div`
  position: relative;
  width: ${(props) => `${props.width}%`};
  margin-left: ${(props) => `${props.offset}%`};
  background-color: ${(props) => `${props.color}`};
  z-index: 999;
  height: 12px;
  border-radius: 2px;
`;

export const ServiceTitle = styled(Typography)`
  font-size: 13px !important;
  color: rgb(66, 82, 110);
  font-weight: 500 !important;
  display: flex;
  align-items: center;
  position: relative;
`;

export const ItemAttrs = styled(Typography)`
  font-size: 12px !important;
  color: rgb(66, 82, 110);
  font-weight: 500;
`;

export const ItemOperation = styled(Typography)`
  font-size: 12px !important;
  color: rgb(155, 161, 175);
  font-style: italic;
`;

export const Wrapper = styled.div``;

export const SkeletonLeft = styled.div`
  flex: 0 0 30%;
  transition: flex 300ms ease 0;
  overflow: hidden;
`;

export const SkeletonRight = styled.div`
  flex: 0 0 calc(70% - 14px);
  transition: flex 300ms ease 0s;
`;

export const ItemLeft = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  flex: 1 1 30%;
  transition: flex 300ms ease 0s;
`;

export const ItemRight = styled.div`
  flex: 0 0 calc(70% - 16px);
  transition: flex 300ms ease 0s;
`;

export const SkeletonRightWrapper = styled.div`
  position: sticky;
  top: 0px;
`;

const SlotBar = styled.div`
  background: rgb(213, 215, 224);
  width: 1px;
  height: calc(100vh - 88px);
  position: absolute;
  top: 3px;
  transition: height 200ms ease-in-out 0s;
  left: ${(props) => `${props.left}%`};
  z-index: 0;
`;

const SlotHeader = styled.div`
  font-weight: 500;
  font-size: 10px;
  color: rgb(155, 161, 175);
  position: absolute;
  bottom: 0px;
  /* background: rgb(255, 255, 255); */
  /* left: ${(props) => `calc(${props.index * 16.66}% - 10px)`}; */
  left: ${(props) => `calc(${props.left}% - 16px)`};
`;

export const Skeleton = ({ totalDuration }) => {
  const pillars = totalDuration / 100;
  const pillarWidth = 100 / pillars;

  return (
    <Box sx={{ display: "flex", gap: "23px" }}>
      <SkeletonLeft />
      <SkeletonRight>
        <SkeletonRightWrapper>
          {[0, 1, 2, 3, 4, 5, 6].map((item, index) => {
            let left = 0,
              label;
            if (Math.floor(pillars) >= index) {
              left = index * pillarWidth;
              label = `${100 * index}ms`;
            } else {
              left = 100;
              label = `${totalDuration}ms`;
            }

            return (
              <>
                <SlotHeader
                  index={index}
                  left={left}
                  key={`slot-header-${index}`}
                >
                  {label}
                </SlotHeader>
                <SlotBar index={index} left={left} key={`slot-bar-${index}`} />
              </>
            );
          })}
        </SkeletonRightWrapper>
      </SkeletonRight>
    </Box>
  );
};

export default Skeleton;
