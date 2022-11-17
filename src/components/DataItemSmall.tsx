import { Dataset } from "../hooks/datasets";
import { Box, Flex, Img } from "./basics";

export function DatasetItemSmall({
  dataset,
  active,
  setActive,
  ...props
}: {
  dataset: Dataset;
  active: boolean;
  setActive?: (s: boolean) => void;
  [prop: string]: unknown; // TODO: could be more restrictive
}) {
  return (
    <Flex
      px={3}
      py={1}
      gap={3}
      alignItems="center"
      flexDirection="row"
      borderStyle="solid"
      borderColor={active ? "text" : "bgLight"}
      backgroundColor={active ? "accent" : "bgLight"}
      onClick={setActive ? () => setActive(!active) : undefined}
      cursor={setActive ? undefined : "pointer"}
      {...props}
    >
      <Img height={1} src={dataset.thumbnailUrl} alt="dataset thumbnail" />
      <Flex flexDirection="column">
        <Box color="text" fontSize={2}>
          {dataset.label}
        </Box>
        <Box color="muted" fontSize={0}>
          ${dataset.costPerRecord} per record
        </Box>
      </Flex>
    </Flex>
  );
}
