import { lazy, Suspense } from "react";
import { createPortal } from "react-dom";

export interface Props {
  className?: string;
}

const LazyBackgroundComponent = lazy(() => import("./component"));
const SuspendedBackgroundComponent: React.FC<Props> = (props) => createPortal(
  <Suspense>
    <LazyBackgroundComponent {...props} />
  </Suspense>,
  document.getElementById("root")!,
);

export default SuspendedBackgroundComponent;