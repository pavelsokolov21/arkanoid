export const getYOfBall = ({
  height,
  ballRadius,
  boardBottomGap,
  boardHeight,
}: {
  height: number;
  boardBottomGap: number;
  boardHeight: number;
  ballRadius: number;
}) => height - boardBottomGap - boardHeight + Math.floor(ballRadius / 2);
