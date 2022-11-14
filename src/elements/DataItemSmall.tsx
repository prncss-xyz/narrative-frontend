import { Dataset } from "../hooks/datasets";
import { Box, Flex, Img } from "./basics";

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
      borderStyle="solid"
      borderColor={active ? "text" : "tone1"}
      backgroundColor={active ? "tone0" : "tone1"}
      onClick={disabled ? undefined : onClick}
      cursor={disabled ? undefined : "pointer"}
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
        <Box color="text">{dataset.label}</Box>
        <Box color="tone4">${dataset.costPerRecord} per record</Box>
      </Flex>
    </Flex>
  );
}
