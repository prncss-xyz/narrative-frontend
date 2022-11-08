import { Dataset } from "../hooks/datasets";
import { Flex, Img, Box } from "./basics";

export function DatasetItemSmall({
  dataset,
  active,
  disabled,
  onClick,
}: {
  dataset: Dataset;
  active?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
}) {
  return (
    <Flex
      p={1}
      flexDirection="row"
      gap={2}
      border={"solid"}
      borderColor={active ? undefined : "gray3"}
      color={active ? undefined : "gray1"}
      backgroundColor={active ? "white" : "gray3"}
      onClick={disabled ? undefined : onClick}
      css={{
        cursor: disabled ? undefined : "pointer",
      }}
    >
      <Flex minWidth={1} flexDirection="column" justifyContent="center">
        <Img
          src={dataset.thumbnailUrl}
          width={1}
          height={1}
          alt="dataset thumbnail"
        />
      </Flex>
      <Flex flexDirection="column">
        <Box>{dataset.label}</Box>
        <Box color={"gray1"}>${dataset.costPerRecord} per record</Box>
      </Flex>
    </Flex>
  );
}
