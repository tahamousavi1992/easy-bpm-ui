var draw2dCanvas = null;
function draw2dInit() {
    // create the draw2dCanvas for the user interaction
    draw2dCanvas = new draw2d.Canvas("gfx_holder2", 2000, 2000);
    //scroll setting
    //draw2dCanvas.setScrollArea("#gfx_holder2");
    draw2dCanvas.installEditPolicy(new draw2d.policy.canvas.FadeoutDecorationPolicy());
    draw2dCanvas.installEditPolicy(new draw2d.policy.canvas.ExtendedKeyboardPolicy());

    draw2dCanvas.installEditPolicy(new CopyInterceptorPolicy());
    //stop creating conncetion usinfg click on output nodes
    draw2dCanvas.installEditPolicy(new draw2d.policy.connection.ConnectionCreatePolicy());  //stop creating conncetion usinfg click on output nodes

    draw2dCanvas.paper.canvas.style.position = "relative";

    draw2dCanvas.on("zoom", function (emmiter, event) {
        if (draw2dCanvas.getZoom() >= 2.7569) {
            draw2dCanvas.setZoom(2.7569);
        }
    });
}

function draw2dAddStartCircle() {
    //start circle with label
    let startShape = new draw2d.shape.basic.Circle({ fill: '#ffffff', diameter: 60, x: 300, y: 10, alpha: 0.3 });
    startShape.deleteable = false;
    draw2dAddLabelTo(startShape, 'Start');

    //add port to start circle
    draw2dAddOutPutPort(startShape, new draw2d.layout.locator.BottomLocator());
    draw2dCanvas.add(startShape);
    draw2AddContextMenu(startShape);

    return startShape;
}

function draw2dAddNextAction(parentElement, label, IsYesOutPutIfClause) {
    //add condition
    let xAmount = parentElement.NAME == 'draw2d.shape.basic.Diamond' ? (IsYesOutPutIfClause ? (parentElement.x + 60) : (parentElement.x - 40)) : (parentElement.NAME == 'draw2d.shape.basic.Circle' ? (parentElement.x-10) : parentElement.x);
    let actionShape = new draw2d.shape.basic.Rectangle({ userData: { type: 'actions' }, width: 80, height: 40, x: xAmount, y: parentElement.y + 100, keepAspectRatio: true, alpha: 0.3 });
    //add label
    if (label != null && label != '') {
        draw2dAddLabelTo(actionShape, label);
    }
    //add one input and two output port to if clause
    draw2dAddInputPort(actionShape, new draw2d.layout.locator.TopLocator());
    draw2dAddOutPutPort(actionShape, new draw2d.layout.locator.BottomLocator());//output arrow
    draw2dCanvas.add(actionShape);
    //change conflicted connection
    draw2dInsertConnectionBetween(parentElement, actionShape, IsYesOutPutIfClause);
    //add connection between parent and condition
    draw2dAddConnection(parentElement, actionShape, IsYesOutPutIfClause == null ? null : (IsYesOutPutIfClause ? 'Yes' : 'No'), IsYesOutPutIfClause);
    draw2AddContextMenu(actionShape);
    draw2dDbCLickOpenEdit(actionShape);
    return actionShape;
}

//add a ifElseClause to draw2dCanvas and parent element should have output node.
function draw2dAddNextIfElseClause(parentElement, label, IsYesOutPutIfClause) {
    //add condition
    let xAmount = parentElement.NAME == 'draw2d.shape.basic.Diamond' ? (IsYesOutPutIfClause ? (parentElement.x + 60) : (parentElement.x - 40)) : parentElement.x;
    let conditionShape = new draw2d.shape.basic.Diamond({ width: 80, height: 60, x: xAmount, y: parentElement.y + 100, alpha: 0.3 });
    //add label
    if (label != null && label != '') {
        draw2dAddLabelTo(conditionShape, label);
    }
    //add one input and two output port to if clause
    draw2dAddInputPort(conditionShape, new draw2d.layout.locator.TopLocator());
    draw2dAddOutPutPort(conditionShape, new draw2d.layout.locator.RightLocator());//yes output arrow
    draw2dAddOutPutPort(conditionShape, new draw2d.layout.locator.LeftLocator());//no output arrow
    draw2dCanvas.add(conditionShape);
    //change conflicted connection
    draw2dInsertConnectionBetween(parentElement, conditionShape, IsYesOutPutIfClause);
    //add connection between parent and condition
    draw2dAddConnection(parentElement, conditionShape, IsYesOutPutIfClause == null ? null : (IsYesOutPutIfClause ? 'Yes' : 'No'), IsYesOutPutIfClause);
    draw2AddContextMenu(conditionShape);
    draw2dDbCLickOpenEdit(conditionShape);
    return conditionShape;
}

//add connection between two nodes.
function draw2dAddConnection(start, end, label, IsYesOutPutIfClause) {
    // Create a Connection and connect he Start and End node
    //if it is connecting yes or no output of ifclause.
    if (IsYesOutPutIfClause != null) {
        draw2dCanvas.add(new draw2ArrowConnection({
            source: IsYesOutPutIfClause ? start.getOutputPort(0) : start.getOutputPort(1),
            target: end.getInputPort(0),
            labeltext: label,
            userData: { name: IsYesOutPutIfClause ? 'Yes' : 'No' }//used in goto check condition
        }));
    }
    else {
        draw2dCanvas.add(new draw2ArrowConnection({
            source: start.getOutputPort(0),
            target: end.getInputPort(0),
            labeltext: label,
            userData: { name: '' }
        }));
    }

}

function draw2dAddOutPutPort(element, locator) {
    let port = new draw2d.OutputPort();
    port.draggable = false;
    port.deleteable = false;
    port.repaintBlocked = false;
    port.name = port.id;
    element.addPort(port, locator);
}

function draw2dAddInputPort(element, locator) {
    let port = new draw2d.InputPort();
    port.draggable = false;
    port.deleteable = false;
    port.repaintBlocked = false;
    port.name = port.id;
    element.addPort(port, locator);
}

function draw2dInsertConnectionBetween(parentElement, newElement, IsYesOutPutIfClause) {
    if ((parentElement.NAME == 'draw2d.shape.basic.Circle' && parentElement.getConnections().data.length > 0)
        || parentElement.getConnections().data.length > 1) {
        //find parent output port id
        let parentOutputPortId = parentElement.NAME == 'draw2d.shape.basic.Diamond' ?
            IsYesOutPutIfClause ? parentElement.outputPorts.data[0].id : parentElement.outputPorts.data[1].id :
            parentElement.outputPorts.data[0].id;
        //filter connection which their source port id is equal to parent element output port id
        let outPutConnection = parentElement.getConnections().data.find(function (item) {
            return item.getSource().id == parentOutputPortId;
        });
        if (outPutConnection != null) {
            //change y position of target element
            let targetElement = outPutConnection.targetPort.parent;
            targetElement.setY(targetElement.y + 100);
            //remove current condision
            draw2dCanvas.lines.remove(outPutConnection);
            outPutConnection.setCanvas(null);
            outPutConnection.disconnect();

            //add connection between parent and condition
            draw2dAddConnection(newElement, targetElement, (newElement.NAME == 'draw2d.shape.basic.Diamond' ? 'Yes' : ''), newElement.NAME == 'draw2d.shape.basic.Diamond' ? true : null);
        }
    }
}

//find parent shape and check does it come from yes condition connection
function draw2dFindParentIsYesCondition(shapeId) {
    var writer = new draw2d.io.json.Writer();
    let _json = null;
    writer.marshal(draw2dCanvas, function (json) {
        _json = json;
    });

    let parentNodeDiamond = draw2dFindParentShapes(_json, shapeId).find((c) => { return c.type == 'draw2d.shape.basic.Diamond'; });
    if (parentNodeDiamond != null) {
        let connectionShape = _json.find(function (item) {
            return item.type == 'draw2d.Connection' && item.target != null && item.target.node == shapeId && item.source.node == parentNodeDiamond.id
        });
        return draw2dCanvas.getFigure(parentNodeDiamond.id).getOutputPort(0).connections.data.length > 0 &&
            draw2dCanvas.getFigure(parentNodeDiamond.id).getOutputPort(0).connections.data[0].id == connectionShape.id;
    }
    return null;
}
//find parent shape id
function draw2dFindParentShapeNodeId(shapeId) {
    var writer = new draw2d.io.json.Writer();
    let _json = null;
    writer.marshal(draw2dCanvas, function (json) {
        _json = json;
    });
    let parentNode = draw2dFindParentShapes(_json, shapeId, false);
    return parentNode != null && parentNode.length > 0 ? parentNode.filter((c) => { return c.type != 'draw2d.shape.basic.Circle' }).map((c) => { return c.id }).join() : '';
}
//find parent shape id
function draw2dIsFirstStep(shapeId) {
    var writer = new draw2d.io.json.Writer();
    let _json = null;
    writer.marshal(draw2dCanvas, function (json) {
        _json = json;
    });
    let parentNode = draw2dFindParentShapes(_json, shapeId, true);
    return parentNode != null && parentNode.find((c) => { return c.type == 'draw2d.shape.basic.Circle' }) != null;
}
//find parent id
function draw2dFindParentShapes(_json, shapeId, includeCircle) {
    let connectionShapes = _json.filter(function (item) {
        return item.type == 'draw2d.Connection' && item.target != null && item.target.node == shapeId
    });
    if (connectionShapes == null || connectionShapes.length == 0) return new Array();
    return _json.filter((item) => { return connectionShapes.find((d) => { return item.id == d.source.node }) != null && (includeCircle == true || item.type != 'draw2d.shape.basic.Circle') });
}

//load from json object at first of loading form.
function draw2dLoadFromJsonObject(jsonDocument) {
    var reader = new draw2d.io.json.Reader();
    reader.unmarshal(draw2dCanvas, jsonDocument);

    //For removing the shade created in diagram connection it'll destroy it then it'll init it then it'll unmarshal json object again.
    draw2dCanvas.destroy();
    draw2dInit();
    var reader = new draw2d.io.json.Reader();
    reader.unmarshal(draw2dCanvas, jsonDocument);

    draw2dCanvas.getFigures().data.forEach(function (figure) {
        //First should add labels from figure.userData.name because it is used in draw2AddContextMenu function.
        if (figure.userData.name != null && figure.userData.name != '') {
            draw2dAddLabelTo(figure, figure.userData.name);
        }
        //add contextmenu to figure
        draw2AddContextMenu(figure);
        //add double click event
        draw2dDbCLickOpenEdit(figure);
        //add expression icons to rectangles which are expression code.
        if (figure.userData.type != null && figure.userData.type == 'expression') {
            draw2dAddExpressionIcon(figure);
        }

    });
    draw2dCanvas.getLines().data.forEach(function (figure) {
        //add labels yes and no to condition connecion.
        if (figure.userData.name != null && figure.userData.name != '') {
            // add the new decoration to the connection with a position locator.
            figure.add(new draw2d.shape.basic.Label({
                text: figure.userData.name,
                color: "#0d0d0d",
                fontColor: "#0d0d0d",
                bgColor: "#f0f0f0"
            }), new draw2d.layout.locator.ManhattanMidpointLocator());
        }

    });

}

function draw2dGetCanvasAsJsonString() {
    var writer = new draw2d.io.json.Writer();
    let jsonString = '';
    writer.marshal(draw2dCanvas, function (json) {
        // convert the json object into string representation
        jsonString = JSON.stringify(json, null, 2);
    });
    return jsonString;
}

//add context menu to element that are loaded first time.
function draw2AddContextMenu(shape) {
    if (shape.NAME == 'draw2d.shape.basic.Diamond') {
        shape.onContextMenu = function (x, y) {
            $.contextMenu({
                selector: 'body',
                events:
                {
                    hide: function () { $.contextMenu('destroy'); }
                },
                callback: function (key, options) {
                    switch (key) {
                        case "addYesIfClause":
                            //it will add another action by clicking on shape.
                            draw2dAddNextIfElseClause(this, 'Condition', true);
                            break;
                        case "addYesAction":
                            //it will add another action by clicking on shape.
                            draw2dAddNextAction(this, 'Action', true);
                            break;
                        case "addNoIfClause":
                            //it will add another action by clicking on shape.
                            draw2dAddNextIfElseClause(this, 'Condition', false);
                            break;
                        case "addNoAction":
                            //it will add another action by clicking on shape.
                            draw2dAddNextAction(this, 'Action', false);
                            break;
                        case "edit":
                            openConditionForm(this.id);
                            break;
                        case "delete":
                            var cmd = new draw2d.command.CommandDelete(this);
                            this.getCanvas().getCommandStack().execute(cmd);
                            break;
                        case "goToYes":
                            draw2OpenGoToModal(this, true);
                            break;
                        case "goToNo":
                            draw2OpenGoToModal(this, false);
                            break;
                        default:
                            break;
                    }

                }.bind(this),
                x: x,
                y: y,
                items:
                {
                    "addYesIfClause": { name: "Add condition for yes" },
                    "addYesAction": { name: "Add action for yes" },
                    "addNoIfClause": { name: "Add condition for no" },
                    "addNoAction": { name: "Add action for no" },
                    "goToYes": { name: "Go to for yes" },
                    "goToNo": { name: "Go to for no" },
                    "sep2": "---------",
                    "edit": { name: "Edit" },
                    "delete": { name: "Delete" }
                }
            });

        }
    }
    if (shape.NAME == 'draw2d.shape.basic.Circle') {
        shape.onContextMenu = function (x, y) {
            $.contextMenu({
                selector: 'body',
                events:
                {
                    hide: function () { $.contextMenu('destroy'); }
                },
                callback: function (key, options) {
                    switch (key) {
                        case "addIfClause":
                            //it will add another action by clicking on shape.
                            draw2dAddNextIfElseClause(this, 'Condition', null);
                            break;
                        case "addAction":
                            //it will add another action by clicking on shape.
                            draw2dAddNextAction(this, 'Action', null);
                            break;
                        case "delete":
                            var cmd = new draw2d.command.CommandDelete(this);
                            this.getCanvas().getCommandStack().execute(cmd);
                            break;
                        case "goTo":
                            draw2OpenGoToModal(this, null);
                            break;
                        default:
                            break;
                    }
                }.bind(this),
                x: x,
                y: y,
                items:
                {
                    "addIfClause": { name: "Add condition" },
                    "addAction": { name: "Add action" },
                    "goTo": { name: "Go to" },
                }
            });

        }
    }
    if (shape.NAME == 'draw2d.shape.basic.Rectangle') {

        let contextMenuItems =
        {
            "addIfClause": { name: "Add condition" },
            "addAction": { name: "Add action" },
            "goTo": { name: "Go to" },
            "sep2": "---------",
            "edit": { name: "Edit" },
            "delete": { name: "Delete" }
        };
        if (shape.userData.type != 'expression') {
            contextMenuItems["sep1"] = "---------";
            contextMenuItems["toExpression"] = { name: "To Expression" };
        }
        shape.onContextMenu = function (x, y) {
            $.contextMenu({
                selector: 'body',
                events:
                {
                    hide: function () { $.contextMenu('destroy'); }
                },
                callback: function (key, options) {
                    switch (key) {
                        case "addIfClause":
                            //it will add another action by clicking on shape.
                            draw2dAddNextIfElseClause(this, 'Condition', null);
                            break;
                        case "addAction":
                            //it will add another action by clicking on shape.
                            draw2dAddNextAction(this, 'Action', null);
                            break;
                        case "toExpression":
                            draw2dToExpression(this);
                            break;
                        case "edit":
                            if (this.userData.type == 'expression')
                                openExpressionForm(this.id)
                            else
                                openActionList(this.id);
                            break;
                        case "delete":
                            var cmd = new draw2d.command.CommandDelete(this);
                            this.getCanvas().getCommandStack().execute(cmd);
                            break;
                        case "goTo":
                            draw2OpenGoToModal(this, null);
                            break;
                        default:
                            break;
                    }

                }.bind(this),
                x: x,
                y: y,
                items: contextMenuItems
            });

        }
    }
    draw2dAddEventsToLabels(shape);
}

//open edit modal by double click on figures
function draw2dDbCLickOpenEdit(shape) {
    shape.onDoubleClick = function () {
        if (this.NAME == 'draw2d.shape.basic.Rectangle') {
            if (this.userData.type == 'expression')
                openExpressionForm(this.id)
            else
                openActionList(this.id);
        }
        if (this.NAME == 'draw2d.shape.basic.Diamond')
            openConditionForm(this.id);

    };
    draw2dAddEventsToLabels(shape);
}

function draw2UpdateDiagramData(objectXmlCodeArray, name, shapeId) {
    objectXmlCodeArray.forEach((item) => {
        let id = getValueInsideXmlTag('ID', item);
        let indexUpdate = -1;
        //if it exists in designCodeData then update that otherwise add to it.
        window["designCodeData"].forEach((data, index) => { if (data.id == id) { indexUpdate = index } })
        if (indexUpdate > -1) {
            window["designCodeData"][indexUpdate] = { data: toB64(item), shapeId: shapeId, id: id };
        }
        else {
            window["designCodeData"].push({ data: toB64(item), shapeId: shapeId, id: id });
        }
    });

    //delete unWanted arrayItem.
    window["designCodeData"] = window["designCodeData"].filter((data, index) => {
        if (data.shapeId != shapeId) return true;
        let cAction = objectXmlCodeArray.find((item) => {
            let id = getValueInsideXmlTag('ID', item);
            return id == data.id;
        });
        return cAction != null;
    });

    let figure = draw2dCanvas.getFigure(shapeId);
    if (name != null && name != '') {
        draw2dAddLabelTo(figure, name);
    }
}

//open goto form as modal
function draw2OpenGoToModal(shape, IsYesOutPutIfClause) {
    //start check if the figure has output connection or not
    if (shape.NAME == 'draw2d.shape.basic.Diamond') {
        //for Yes output
        if (IsYesOutPutIfClause && shape.getConnections().data.find((item) => { return item.sourcePort.id == shape.getOutputPort(0).id; }) != null) {
            alert('It is not possible to add more than one output.');
            return;
        }
        //for No output
        if (!IsYesOutPutIfClause && shape.getConnections().data.find((item) => { return item.sourcePort.id == shape.getOutputPort(1).id; }) != null) {
            alert('It is not possible to add more than one output.');
            return;
        }
    }
    else {
        if (shape.getConnections().data.find((item) => { return item.sourcePort.id == shape.getOutputPort(0).id; }) != null) {
            alert('It is not possible to add more than one output.');
            return;
        }
    }
    //end check.
    window.draw2dSelectedGoToShape = shape;
    window.draw2dGoToIsYesOutPutIfClause = IsYesOutPutIfClause;
    document.getElementById('ddlDraw2dFigureId').innerHTML = ''
    //add optional element to select ddlDraw2dFigureId;
    let option = document.createElement('option');
    option.value = '';
    option.text = '-- انتخاب کنید --';
    document.getElementById('ddlDraw2dFigureId').options.add(option)

    draw2dCanvas.getFigures().data.forEach(function (figure) {
        //all except itself and start shape.
        if (shape.id != figure.id && figure.NAME != 'draw2d.shape.basic.Circle') {
            let option = document.createElement('option');
            option.value = figure.id;
            option.text = figure.userData.name != null && figure.userData.name != '' ? figure.userData.name : figure.NAME;
            document.getElementById('ddlDraw2dFigureId').options.add(option)
        }
    });
    openModal('divGoToModal', true);
}

function draw2dSaveGoTo() {
    if (document.getElementById('ddlDraw2dFigureId').value != '') {
        let sourceShape = window.draw2dSelectedGoToShape;
        let targetShape = draw2dCanvas.getFigure(document.getElementById('ddlDraw2dFigureId').value);
        draw2dAddConnection(sourceShape, targetShape,
            (window.draw2dGoToIsYesOutPutIfClause == null ? null : window.draw2dGoToIsYesOutPutIfClause == true ? 'Yes' : 'No'),
            window.draw2dGoToIsYesOutPutIfClause);
    }
    closeModal('divGoToModal');
}

//adding a lable to the shape
function draw2dAddLabelTo(figure, name) {
    //remove current label if it exists
    let currentLabel = figure.getChildren().data.find((item) => { return item.NAME == 'draw2d.shape.basic.Label'; });
    if (currentLabel != null);
    figure.remove(currentLabel);

    let label = new draw2d.shape.basic.Label({ text: name, x: 40, y: 10, stroke: 0 });
    figure.add(label, new draw2d.layout.locator.CenterLocator());
    if (figure.userData == null)
        figure.userData = { name: name };
    else
        figure.userData.name = name;
    draw2dAddEventsToLabels(figure);
}

//adding a expression code icon to the shape
function draw2dAddExpressionIcon(figure) {
    if (figure.getChildren().data.find((item) => { item.NAME == 'draw2d.shape.icon.Code' }) == null) {
        let icon = new draw2d.shape.icon.Code({ x: 0, y: 0, width: 15, height: 15 });
        figure.add(icon, new draw2d.layout.locator.Locator());
        figure.setWidth(figure.width + 1);
        figure.setWidth(figure.width - 1);
        figure.userData.type = 'expression';
    }
}

//get xml diagram code .
//if withShapeId is set,it will only return xml of that specific shape.
function draw2dGetXml(withShapeId) {
    let jsonDiagram = draw2dGetCanvasAsJsonString();
    let code = '';
    window["designCodeData"].forEach(function (item) {
        //add only xml codes that are existed.
        if (jsonDiagram.indexOf(item.shapeId) > -1 && (withShapeId == null || withShapeId == item.shapeId)) {
            let data = fromB64(item.data);
            let parentShapeId = draw2dFindParentShapeNodeId(item.shapeId);
            let isFirst = draw2dIsFirstStep(item.shapeId);
            let isOutputYes = draw2dFindParentIsYesCondition(item.shapeId);
            data = data.replace(`<ParentShapeID>${getValueInsideXmlTag('ParentShapeID', data)}</ParentShapeID>`,
                `<ParentShapeID>${parentShapeId}</ParentShapeID>`);
            data = data.replace(`<IsFirst>${getValueInsideXmlTag('IsFirst', data)}</IsFirst>`,
                `<IsFirst>${isFirst}</IsFirst>`);
            data = data.replace(`<IsOutputYes>${getValueInsideXmlTag('IsOutputYes', data)}</IsOutputYes>`,
                `<IsOutputYes>${isOutputYes}</IsOutputYes>`);
            code += data;
        }
    });
    return code;
}

//convert diagram to one expression code.
function draw2dMakeExpression(renderedCode, assemblies) {
    //first remove all element except start circle.
    let length = draw2dCanvas.getFigures().data.length;
    for (let i = 1; i < length; i++) {
        draw2dCanvas.remove(draw2dCanvas.getFigures().data[1]);
    }
    //first remove all connection
    length = draw2dCanvas.getLines().data.length;
    for (let i = 0; i < length; i++) {
        let c = draw2dCanvas.getLines().data[0];
        draw2dCanvas.lines.remove(c);
        c.setCanvas(null);
        c.disconnect();
    }
    let circle = draw2dCanvas.getFigures().data[0];
    //add a Action
    let actionShape = draw2dAddNextAction(circle, 'Expression', null);
    //change the user data type of the activity(rectangle) shape to expression.
    draw2dAddExpressionIcon(actionShape);
    let guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    let code = `<DCExpressionModel>
<ID>${guid}</ID>
<ParentShapeID>${circle.id}</ParentShapeID>
<IsFirst>true</IsFirst>
<ShapeID>${actionShape.id}</ShapeID>
<Name>Expression</Name>
<IsOutputYes></IsOutputYes>
<ActionType>4</ActionType>
<Assemblies>${assemblies}</Assemblies>
<ExpressionCode>${renderedCode}</ExpressionCode>
</DCExpressionModel>`;
    draw2UpdateDiagramData([code], 'Expression', actionShape.id);
}

//adding event likes onDoubleClick and onContextMenu to 
function draw2dAddEventsToLabels(figure) {
    if (figure.onDoubleClick != null && figure.children.data.length > 0) {
        figure.children.data[0].figure.onDoubleClick = figure.onDoubleClick.bind(figure);
    }
    if (figure.onContextMenu != null && figure.children.data.length > 0) {
        figure.children.data[0].figure.onContextMenu = figure.onContextMenu.bind(figure);
    }
}

var draw2ArrowConnection = draw2d.Connection.extend({
    init: function (attr) {
        this._super(attr);
        // Create any Draw2D figure as decoration for the connection
        //
        if (attr['labeltext'] != null) {
            this.label = new draw2d.shape.basic.Label({
                text: attr['labeltext'],
                color: "#0d0d0d",
                fontColor: "#0d0d0d",
                bgColor: "#f0f0f0"
            });
            // add the new decoration to the connection with a position locator.
            //
            this.add(this.label, new draw2d.layout.locator.ManhattanMidpointLocator());
            // Register a label editor with a dialog
            //
            this.label.installEditor(new draw2d.ui.LabelEditor());
        }

        this.attr({
            router: new draw2d.layout.connection.InteractiveManhattanConnectionRouter(),
            outlineStroke: 1,
            outlineColor: "#303030",
            stroke: 1,
            color: "#00a8f0",
            radius: 4,
        });
        this.setTargetDecorator(new draw2d.decoration.connection.ArrowDecorator());
    }
});
