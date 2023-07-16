import { useState, useEffect } from "react";
import { Panel, PanelGroup } from "react-resizable-panels";

import ResizeHandle from "./ResizeHandle";
import styles from "./styles.module.css";

export default function App() {
  const [showLastPanel, setShowLastPanel] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [showLastPanel]);

  const panelClass = showLastPanel
    ? `${styles.Panel} ${isAnimating ? styles.Show : ""}`
    : `${styles.Panel} ${isAnimating ? styles.Hide : styles.Hidden}`;

  return (
    <div className={styles.Container}>
      <div className={styles.TopRow}>
        <p>
          <button
            className={styles.Button}
            onClick={() => setShowLastPanel(!showLastPanel)}
          >
            {showLastPanel ? "Hide" : "Show"} right panel
          </button>
        </p>
      </div>
      <div className={styles.BottomRow}>
        <PanelGroup autoSaveId="example" direction="horizontal">
          <Panel
            className={`${styles.PanelMiddle} ${
              isAnimating ? styles.PanelMiddleExpand : ""
            }`}
            collapsible={true}
            order={2}
            style={{ flex: showLastPanel ? "60 1 0px" : "100 1 0px" }}
            defaultSize={60}
          >
            <div className={styles.PanelContentMiddle}>middle</div>
          </Panel>

          <>
            <ResizeHandle />
            <Panel
              className={panelClass}
              collapsible={true}
              defaultSize={20}
              order={3}
            >
              <div className={styles.PanelContent}>right</div>
            </Panel>
          </>
        </PanelGroup>
      </div>
    </div>
  );
}
