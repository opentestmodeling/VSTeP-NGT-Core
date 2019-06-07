/** @jsx svg */
import { svg } from 'snabbdom-jsx';

import { VNode } from "snabbdom/vnode";
import { Hoverable, Point, PolylineEdgeView, RenderingContext, SEdge, Selectable, SNode, SShapeElement, toDegrees, IView, SPort } from "sprotty";
import { injectable } from 'inversify';

@injectable()
export class PolylineArrowEdgeView extends PolylineEdgeView {

    protected renderAdditionals(edge: SEdge, segments: Point[], context: RenderingContext): VNode[] {
        const p1 = segments[segments.length - 2]
        const p2 = segments[segments.length - 1]
        return [
            <path class-sprotty-edge-arrow={true} d="M 6,-3 L 0,0 L 6,3 Z"
                  transform={`rotate(${this.angle(p2, p1)} ${p2.x} ${p2.y}) translate(${p2.x} ${p2.y})`}/>
        ]
    }

    angle(x0: Point, x1: Point): number {
        return toDegrees(Math.atan2(x1.y - x0.y, x1.x - x0.x))
    }
}

@injectable()
export class TriangleButtonView implements IView {
    render(model: SPort, context: RenderingContext, args?: object): VNode {
        return <path class-sprotty-button={true} d="M 0,0 L 8,4 L 0,8 Z" />
    }
}

@injectable()
export class EllipseNodeView implements IView {
    render(node: Readonly<SShapeElement & Hoverable & Selectable>, context: RenderingContext): VNode {
        const dx = Math.max(node.size.width, 0) / 2;
        const dy = Math.max(node.size.height, 0) / 2;
        return <g>
            <ellipse class-sprotty-node={node instanceof SNode} class-sprotty-port={node instanceof SPort}
                  class-mouseover={node.hoverFeedback} class-selected={node.selected}
                  cx={dx} cy={dy} rx={dx} ry={dy}></ellipse>
            {context.renderChildren(node)}
        </g>;
    }
}

@injectable()
export class VstepNgtBoxView implements IView {
    render(box: Readonly<SShapeElement>, context: RenderingContext) {
        return <g>
            <rect class-vstepngt-box={true} x={0} y={0} width={box.size.width} height={box.size.height}></rect>
            {context.renderChildren(box)}
        </g>;
    }
}