import { Container, ContainerModule } from "inversify";
import '@pizzafactory/sprotty-theia/css/theia-sprotty.css';
import 'sprotty/css/sprotty.css';
import { boundsModule, buttonModule, configureModelElement, ConsoleLogger, defaultModule, expandModule, 
    exportModule, fadeModule, hoverModule, HtmlRoot, HtmlRootView, LogLevel, modelSourceModule, moveModule, 
    openModule, overrideViewerOptions, PreRenderedElement, PreRenderedView, RectangularNodeView, SEdge, 
    selectModule, SGraphView, SLabelView, TYPES, undoRedoModule, viewportModule, decorationModule, 
    SModelRoot, edgeEditModule, SCompartmentView, SRoutingHandle, SRoutingHandleView, CreateElementCommand, labelEditModule, 
    configureCommand, updateModule, routingModule, ManhattanEdgeRouter, edgeLayoutModule, SCompartment } from 'sprotty';
import "../css/diagram.css";
import { EllipseNodeView, PolylineArrowEdgeView, TriangleButtonView, VstepNgtBoxView } from "./views";
import { StatesModelFactory, StatesDiagram, TestContainer, TestTarget, TestViewpoint, CreateTransitionPort, StatesLabel } from "./model";
import { CustomRouter } from "./custom-edge-router";

const vstepNgtCoreDiagramModule = new ContainerModule((bind, unbind, isBound, rebind) => {
    rebind(TYPES.ILogger).to(ConsoleLogger).inSingletonScope();
    rebind(TYPES.LogLevel).toConstantValue(LogLevel.warn);
    rebind(TYPES.IModelFactory).to(StatesModelFactory);
    unbind(ManhattanEdgeRouter);
    bind(ManhattanEdgeRouter).to(CustomRouter).inSingletonScope();

    const context = { bind, unbind, isBound, rebind };
    configureModelElement(context, 'graph', StatesDiagram, SGraphView);
    configureModelElement(context, 'node.container', TestContainer, RectangularNodeView);
    configureModelElement(context, 'node.target', TestTarget, EllipseNodeView);
    configureModelElement(context, 'node.viewpoint', TestViewpoint, RectangularNodeView);
    configureModelElement(context, 'label', StatesLabel, SLabelView);
    configureModelElement(context, 'label:xref', StatesLabel, SLabelView);
    configureModelElement(context, 'edge', SEdge, PolylineArrowEdgeView);
    configureModelElement(context, 'html', HtmlRoot, HtmlRootView);
    configureModelElement(context, 'pre-rendered', PreRenderedElement, PreRenderedView);
    configureModelElement(context, 'palette', SModelRoot, HtmlRootView);
    configureModelElement(context, 'routing-point', SRoutingHandle, SRoutingHandleView);
    configureModelElement(context, 'volatile-routing-point', SRoutingHandle, SRoutingHandleView);
    configureModelElement(context, 'port', CreateTransitionPort, TriangleButtonView)
    configureModelElement(context, 'comp', SCompartment, SCompartmentView)
    configureModelElement(context, 'comp.box', SCompartment, VstepNgtBoxView)

    configureCommand(context, CreateElementCommand);
});

export function createStateDiagramContainer(widgetId: string): Container {
    const container = new Container();
    container.load(defaultModule, selectModule, moveModule, boundsModule, undoRedoModule, viewportModule,
        hoverModule, fadeModule, exportModule, expandModule, openModule, buttonModule, modelSourceModule,
        decorationModule, edgeEditModule, edgeLayoutModule, labelEditModule, updateModule, routingModule,
        vstepNgtCoreDiagramModule);
    overrideViewerOptions(container, {
        needsClientLayout: true,
        needsServerLayout: true,
        baseDiv: widgetId,
        hiddenDiv: widgetId + '_hidden'
    });
    return container;
}

