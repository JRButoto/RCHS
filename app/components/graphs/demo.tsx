import { Sparkline } from '@mantine/charts';
import { Stack, Text } from '@mantine/core';

// Data for all seven lines
const line1Data = [
  44.2, 48.9, 52.4, 55.3, 57.6, 59.6, 61.2, 62.7, 64, 65.2, 66.4, 67.6, 68.6,
  69.6, 70.6, 71.6, 72.5, 73.3, 74.2, 75, 75.8, 76.5, 77.2, 78, 78.7, 78, 78.6,
  79.3, 79.9, 80.5, 81.1, 81.7, 82.3, 82.8, 83.4, 83.9, 84.4, 85, 85.5, 86, 86.5,
  87, 87.5, 88, 88.4, 88.9, 89.4, 89.8, 90.3, 90.7, 91.2, 91.6, 92.1, 92.5, 93,
  93.4, 93.9, 94.3, 94.7, 95.2, 95.6, 96.1,
];

const line2Data = [
  46.1, 50.8, 54.4, 57.3, 59.7, 61.7, 63.3, 64.8, 66.2, 67.5, 68.7, 69.9, 71,
  72.1, 73.1, 74.1, 75, 76, 76.9, 77.7, 78.6, 79.4, 80.2, 81, 81.7, 81, 81.7,
  82.5, 83.1, 83.8, 84.5, 85.1, 85.7, 86.4, 86.9, 87.5, 88.1, 88.7, 89.2, 89.8,
  90.3, 90.9, 91.4, 91.9, 92.4, 93, 93.5, 94, 94.4, 94.9, 95.4, 95.9, 96.4, 96.9,
  97.4, 97.8, 98.3, 98.8, 99.3, 99.7, 100.2, 100.7,
];

const line3Data = [
  48, 52.8, 56.4, 59.4, 61.8, 63.8, 65.5, 67, 68.4, 69.7, 71, 72.2, 73.4, 74.5,
  75.6, 76.6, 77.6, 78.6, 79.6, 80.5, 81.4, 82.3, 83.1, 83.9, 84.8, 84.1, 84.9,
  85.6, 86.4, 87.1, 87.8, 88.5, 89.2, 89.9, 90.5, 91.1, 91.8, 92.4, 93, 93.6,
  94.2, 94.7, 95.3, 95.9, 96.4, 97, 97.5, 98.1, 98.6, 99.1, 99.7, 100.2, 100.7,
  101.2, 101.7, 102.3, 102.8, 103.3, 103.8, 104.3, 104.8, 105.3,
];

const line4Data = [
  49.9, 54.7, 58.4, 61.4, 63.9, 65.9, 67.6, 69.2, 70.6, 72, 73.3, 74.5, 75.7,
  76.9, 78, 79.1, 80.2, 81.2, 82.3, 83.2, 84.2, 85.1, 86, 86.9, 87.8, 87.1, 88,
  88.8, 89.6, 90.4, 91.2, 91.9, 92.7, 93.4, 94.1, 94.8, 95.4, 96.1, 96.7, 97.4,
  98, 98.6, 99.2, 99.9, 100.4, 101, 101.6, 102.2, 102.8, 103.3, 103.9, 104.4,
  105, 105.6, 106.1, 106.7, 107.2, 107.8, 108.3, 108.9, 109.4, 110,
];

const line5Data = [
  51.8, 56.7, 60.4, 63.5, 66, 68, 69.8, 71.3, 72.8, 74.2, 75.6, 76.9, 78.1,
  79.3, 80.5, 81.7, 82.8, 83.9, 85, 86, 87, 88, 89, 89.9, 90.9, 90.2, 91.1,
  92, 92.9, 93.7, 94.5, 95.3, 96.1, 96.9, 97.6, 98.4, 99.1, 99.8, 100.5, 101.2,
  101.8, 102.5, 103.2, 103.8, 104.5, 105.1, 105.7, 106.3, 106.9, 107.5, 108.1,
  108.7, 109.3, 109.9, 110.5, 111.1, 111.7, 112.3, 112.8, 113.4, 114, 114.6,
];

const line6Data = [
  53.7, 58.6, 62.4, 65.5, 68, 70.1, 71.9, 73.5, 75, 76.5, 77.9, 79.2, 80.5,
  81.8, 83, 84.2, 85.4, 86.5, 87.7, 88.8, 89.8, 90.9, 91.9, 92.9, 93.9, 93.2,
  94.2, 95.2, 96.1, 97, 97.9, 98.7, 99.6, 100.4, 101.2, 102, 102.7, 103.5,
  104.2, 105, 105.7, 106.4, 107.1, 107.8, 108.5, 109.1, 109.8, 110.4, 111.1,
  111.7, 112.4, 113, 113.6, 114.2, 114.9, 115.5, 116.1, 116.7, 117.4, 118,
  118.6, 119.2,
];

const line7Data = [
  55.6, 60.6, 64.4, 67.6, 70.1, 72.2, 74, 75.7, 77.2, 78.7, 80.1, 81.5, 82.9,
  84.2, 85.5, 86.7, 88, 89.2, 90.4, 91.5, 92.6, 93.8, 94.9, 95.9, 97, 96.3,
  97.3, 98.3, 99.3, 100.3, 101.2, 102.1, 103, 103.9, 104.8, 105.6, 106.4,
  107.2, 108, 108.8, 109.5, 110.3, 111, 111.7, 112.5, 113.2, 113.9, 114.6,
  115.2, 115.9, 116.6, 117.3, 117.9, 118.6, 119.2, 119.9, 120.6, 121.2, 121.9,
  122.6, 123.2, 123.9,
];

function Demo() {
  return (
    <Stack gap="sm">
      <Text>Line 1:</Text>
      <Sparkline
        w={200}
        h={60}
        data={line1Data}
        curveType="linear"
        color="blue"
        fillOpacity={1}
        withGradient={false}
      />

      <Text>Line 2:</Text>
      <Sparkline
        w={200}
        h={60}
        data={line2Data}
        curveType="linear"
        color="red"
        fillOpacity={1}
        withGradient={false}
      />

      <Text>Line 3:</Text>
      <Sparkline
        w={200}
        h={60}
        data={line3Data}
        curveType="linear"
        color="green"
        fillOpacity={1}
        withGradient={false}
      />

      <Text>Line 4:</Text>
      <Sparkline
        w={200}
        h={60}
        data={line4Data}
        curveType="linear"
        color="purple"
        fillOpacity={1}
        withGradient={false}
      />

      <Text>Line 5:</Text>
      <Sparkline
        w={200}
        h={60}
        data={line5Data}
        curveType="linear"
        color="orange"
        fillOpacity={1}
        withGradient={false}
      />

      <Text>Line 6:</Text>
      <Sparkline
        w={200}
        h={60}
        data={line6Data}
        curveType="linear"
        color="cyan"
        fillOpacity={1}
        withGradient={false}
      />

      <Text>Line 7:</Text>
      <Sparkline
        w={200}
        h={60}
        data={line7Data}
        curveType="linear"
        color="magenta"
        fillOpacity={1}
        withGradient={false}
      />
    </Stack>
  );
}

export default Demo;
