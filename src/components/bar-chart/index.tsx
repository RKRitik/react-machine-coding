import { useState } from "react";
import { Button } from "../../../Component-Lab/src/ui/button";
import stylex from "@stylexjs/stylex";
import { motion } from "framer-motion";

type Props = {
  data: { id: string; name: string; ticketCount: number; color: string }[];
};
export function BarChart({ data }: Props) {
  const [showChart, setShowChart] = useState(false);
  function toggleChart() {
    setShowChart(!showChart);
  }

  return (
    <div {...stylex.props(styles.container)}>
      <Button
        {...stylex.props(styles.toggle)}
        primary={true}
        size="medium"
        label="Toggle Chart"
        onClick={toggleChart}
      />
      {showChart && <Bars data={data} />}
    </div>
  );
}

function Bar({
  name,
  color,
  ticketCount,
  ratio,
}: {
  name: string;
  color: string;
  ticketCount: number;
  ratio: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: ratio * ticketCount }}
      exit={{ height: 0 }}
      {...stylex.props(styles.bar)}
      style={{ height: ratio * ticketCount, backgroundColor: color }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        {...stylex.props(styles.tooltip, isHovered && styles.tooltipVisible)}
      >
        {name}-{ticketCount}
      </div>
    </motion.div>
  );
}

function Bars({ data }: Props) {
  const maxHeight = 500;
  const maxValue = Math.max(...data.map((item) => item.ticketCount));
  const ratio = maxHeight / maxValue;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      {...stylex.props(styles.chartContainer)}
    >
      <div {...stylex.props(styles.chart)}>
        {data.map((value) => (
          <Bar {...value} ratio={ratio} />
        ))}
      </div>
      <div {...stylex.props(styles.yLabel)}>Number of Tickets</div>
      <div {...stylex.props(styles.xLabel)}>Departments</div>
    </motion.div>
  );
}

const styles = stylex.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  toggle: {
    width: 100,
    transition: "transform 0.3s ease-in-out",
    transform: {
      default: "scale(1)",
      ":active": "scale(0.9)",
    },
  },
  chartContainer: {
    position: "relative",
    background: "white",
    height: 500,
    border: "2px solid red",
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  yLabel: {
    position: "absolute",
    transform: "translateX(175%) translateY(-450%)",
    rotate: "-90deg",
  },
  xLabel: {
    position: "absolute",
    bottom: -40,
    left: "40%",
  },
  tooltip: {
    display: "block",
    opacity: 0,
    position: "absolute",
    top: 0,
    width: "max-content",
    right: "50%",
    background: "black",
    transform: "translate(50%, -120%)",
    color: "white",
    padding: 4,
    borderRadius: 4,
    transition: "all 0.3s ease-in-out",
    zIndex: 1,
  },
  tooltipVisible: { opacity: 100 },
  bar: {
    position: "relative",
    background: "grey",
    width: "100%",
    transition: "all 0.5s ease-in-out",
  },
  chart: {
    display: "flex",
    alignItems: "flex-end",
    height: "100%",
    gap: 10,
  },
});
