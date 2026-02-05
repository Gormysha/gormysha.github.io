//import './areas.js'

//Area content
const defaultFile=`{"version":2,"nodeGroups":{"entries":{"Plane":{"nodes":{"1770317644563":{"type":"test:mask","uuid":"1770317644563","pos":{"x":400,"y":225},"elements":{"output":{"value":0,"drivers":[]},"arg0":{"value":0,"drivers":[["1770317644564","output"]]},"arg1":{"value":0,"drivers":[["1770317644565","output"]]},"arg2":{"value":0,"drivers":[["1770317644566","output"]]},"arg3":{"value":0,"drivers":[["1770317644570","output"]]}}},"1770317644564":{"type":"test:constant","uuid":"1770317644564","pos":{"x":0,"y":-375},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":0,"drivers":[]}}},"1770317644565":{"type":"test:constant","uuid":"1770317644565","pos":{"x":0,"y":-75},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":1,"drivers":[]}}},"1770317644566":{"type":"test:palette","uuid":"1770317644566","pos":{"x":0,"y":225},"elements":{"output":{"value":0,"drivers":[]},"arg0":{"value":0,"drivers":[["1770317644567","output"]]},"arg1":{"value":0,"drivers":[["1770317644568","output"]]},"arg2":{"value":0,"drivers":[["1770317644569","output"]]}}},"1770317644567":{"type":"test:constant","uuid":"1770317644567","pos":{"x":-400,"y":-75},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":1,"drivers":[]}}},"1770317644568":{"type":"test:constant","uuid":"1770317644568","pos":{"x":-400,"y":225},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":1,"drivers":[]}}},"1770317644569":{"type":"test:constant","uuid":"1770317644569","pos":{"x":-400,"y":525},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":1,"drivers":[]}}},"1770317644570":{"type":"test:constant","uuid":"1770317644570","pos":{"x":0,"y":825},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":0,"drivers":[]}}},"1770317644571":{"type":"_group_output","uuid":"1770317644571","pos":{"x":800,"y":0},"elements":{"Sequence":{"value":0,"drivers":[["1770317644563","output"]]}}}},"sockets":{"entries":{"Sequence":{"flow":"output","type":"test:sequence","target":"test:previewTarget"}},"selected":"Sequence"}},"Sine":{"nodes":{"1770315988361":{"type":"test:mask","uuid":"1770315988361","pos":{"x":705.640823045268,"y":-109.2116872427982},"elements":{"output":{"value":0,"drivers":[]},"arg0":{"value":0,"drivers":[["1770315988362","output"]]},"arg1":{"value":0,"drivers":[["1770315988379","output"]]},"arg2":{"value":0,"drivers":[["1770315988363","output"]]},"arg3":{"value":0,"drivers":[["1770315988367","output"]]}}},"1770315988362":{"type":"test:constant","uuid":"1770315988362","pos":{"x":-390.31767264746196,"y":-490.3769221033374},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":0,"drivers":[]}}},"1770315988363":{"type":"test:palette","uuid":"1770315988363","pos":{"x":-91.47005571132426,"y":325.06036745836974},"elements":{"output":{"value":0,"drivers":[]},"arg0":{"value":0,"drivers":[["1770315988364","output"]]},"arg1":{"value":0,"drivers":[["1770315988365","output"]]},"arg2":{"value":0,"drivers":[["1770315988366","output"]]}}},"1770315988364":{"type":"test:constant","uuid":"1770315988364","pos":{"x":-561.8172839506168,"y":234.25080932784613},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":"6","drivers":[]}}},"1770315988365":{"type":"test:constant","uuid":"1770315988365","pos":{"x":-572.9247410410313,"y":412.068781333285},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":1,"drivers":[]}}},"1770315988366":{"type":"test:constant","uuid":"1770315988366","pos":{"x":-367.43678486836103,"y":586.1842676419193},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":1,"drivers":[]}}},"1770315988367":{"type":"test:constant","uuid":"1770315988367","pos":{"x":299.9013414411964,"y":252.96595984364507},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":"2","drivers":[]}}},"1770315988368":{"type":"_group_output","uuid":"1770315988368","pos":{"x":942.9386008230466,"y":-80.90864197530864},"elements":{"Sequence":{"value":0,"drivers":[["1770315988361","output"]]}}},"1770315988369":{"type":"test:input","uuid":"1770315988369","pos":{"x":-869.5690591758218,"y":-400.44048741654444},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":0,"drivers":[]}}},"1770315988370":{"type":"test:input","uuid":"1770315988370","pos":{"x":-851.8897579363909,"y":-101.07946531425604},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":"1","drivers":[]}}},"1770315988371":{"type":"test:multiply","uuid":"1770315988371","pos":{"x":-503.0540535714038,"y":-353.12383783315437},"elements":{"output":{"value":0,"drivers":[]},"arg0":{"value":0,"drivers":[["1770315988369","output"]]},"arg1":{"value":0,"drivers":[["1770315988372","output"]]}}},"1770315988372":{"type":"test:constant","uuid":"1770315988372","pos":{"x":-817.8898545368426,"y":-264.10897717788225},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":"0.2","drivers":[]}}},"1770315988373":{"type":"test:multiply","uuid":"1770315988373","pos":{"x":-469.01791395657875,"y":-157.71866436186008},"elements":{"output":{"value":0,"drivers":[]},"arg0":{"value":0,"drivers":[["1770315988372","output"]]},"arg1":{"value":0,"drivers":[["1770315988370","output"]]}}},"1770315988374":{"type":"test:multiply","uuid":"1770315988374","pos":{"x":-152.68960912696002,"y":-190.18457857389572},"elements":{"output":{"value":0,"drivers":[]},"arg0":{"value":0,"drivers":[["1770315988375","output"]]},"arg1":{"value":0,"drivers":[["1770315988376","output"]]}}},"1770315988375":{"type":"test:sin","uuid":"1770315988375","pos":{"x":-304.65100598079545,"y":-271.1850702514856},"elements":{"output":{"value":0,"drivers":[]},"arg0":{"value":0,"drivers":[["1770315988371","output"]]}}},"1770315988376":{"type":"test:sin","uuid":"1770315988376","pos":{"x":-300.0998948696843,"y":-160.44136654778225},"elements":{"output":{"value":0,"drivers":[]},"arg0":{"value":0,"drivers":[["1770315988373","output"]]}}},"1770315988377":{"type":"test:multiply","uuid":"1770315988377","pos":{"x":132.4540208318872,"y":-123.71243562007788},"elements":{"output":{"value":0,"drivers":[]},"arg0":{"value":0,"drivers":[["1770315988374","output"]]},"arg1":{"value":0,"drivers":[["1770315988378","output"]]}}},"1770315988378":{"type":"test:constant","uuid":"1770315988378","pos":{"x":-195.3224267910732,"y":69.82436186189787},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":"10","drivers":[]}}},"1770315988379":{"type":"test:add","uuid":"1770315988379","pos":{"x":323.22657858253297,"y":-68.99217745587562},"elements":{"output":{"value":0,"drivers":[]},"arg0":{"value":0,"drivers":[["1770315988377","output"]]},"arg1":{"value":0,"drivers":[["1770315988378","output"]]}}}},"sockets":{"entries":{"Sequence":{"flow":"output","type":"test:sequence","target":"test:previewTarget"}},"selected":"Sequence"}},"Checkerboard":{"nodes":{"1770315988380":{"type":"test:mask","uuid":"1770315988380","pos":{"x":852.5942419590629,"y":-5.9085611542237215},"elements":{"output":{"value":0,"drivers":[]},"arg0":{"value":0,"drivers":[["1770315988381","output"]]},"arg1":{"value":0,"drivers":[["1770315988382","output"]]},"arg2":{"value":0,"drivers":[["1770315988383","output"]]},"arg3":{"value":0,"drivers":[["1770315988392","output"]]}}},"1770315988381":{"type":"test:constant","uuid":"1770315988381","pos":{"x":0,"y":-375},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":0,"drivers":[]}}},"1770315988382":{"type":"test:constant","uuid":"1770315988382","pos":{"x":1.787551292426561,"y":-75},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":1,"drivers":[]}}},"1770315988383":{"type":"test:palette","uuid":"1770315988383","pos":{"x":0,"y":225},"elements":{"output":{"value":0,"drivers":[]},"arg0":{"value":0,"drivers":[["1770315988384","output"]]},"arg1":{"value":0,"drivers":[["1770315988385","output"]]},"arg2":{"value":0,"drivers":[["1770315988386","output"]]}}},"1770315988384":{"type":"test:constant","uuid":"1770315988384","pos":{"x":-418.4112109739368,"y":-41.24611321444901},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":"6","drivers":[]}}},"1770315988385":{"type":"test:constant","uuid":"1770315988385","pos":{"x":-390.7943945130316,"y":172.83490224051235},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":1,"drivers":[]}}},"1770315988386":{"type":"test:constant","uuid":"1770315988386","pos":{"x":-366.24611321444917,"y":399.1900583447649},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":1,"drivers":[]}}},"1770315988388":{"type":"_group_output","uuid":"1770315988388","pos":{"x":1022.5056541470371,"y":-17.72891020453387},"elements":{"Sequence":{"value":0,"drivers":[["1770315988380","output"]]}}},"1770315988389":{"type":"test:input","uuid":"1770315988389","pos":{"x":170.14716530183557,"y":294.8495157807474},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":0,"drivers":[]}}},"1770315988390":{"type":"test:input","uuid":"1770315988390","pos":{"x":229.1363579519123,"y":411.04034978847386},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":"1","drivers":[]}}},"1770315988391":{"type":"test:add","uuid":"1770315988391","pos":{"x":506.2068082780295,"y":251.94828476250981},"elements":{"output":{"value":0,"drivers":[]},"arg0":{"value":0,"drivers":[["1770315988389","output"]]},"arg1":{"value":0,"drivers":[["1770315988390","output"]]}}},"1770315988392":{"type":"test:mod","uuid":"1770315988392","pos":{"x":702.8374504449524,"y":205.47195115941915},"elements":{"output":{"value":0,"drivers":[]},"arg0":{"value":0,"drivers":[["1770315988391","output"]]},"arg1":{"value":0,"drivers":[["1770315988393","output"]]}}},"1770315988393":{"type":"test:constant","uuid":"1770315988393","pos":{"x":555.9284519446602,"y":407.63884895517174},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":"2","drivers":[]}}}},"sockets":{"entries":{"Sequence":{"flow":"output","type":"test:sequence","target":"test:previewTarget"}},"selected":"Sequence"}},"Random":{"nodes":{"1770317644065":{"type":"test:mask","uuid":"1770317644065","pos":{"x":800,"y":0},"elements":{"output":{"value":0,"drivers":[]},"arg0":{"value":0,"drivers":[["1770317644066","output"]]},"arg1":{"value":0,"drivers":[["1770317644067","output"]]},"arg2":{"value":0,"drivers":[["1770317644070","output"]]},"arg3":{"value":0,"drivers":[["1770317644079","output"]]}}},"1770317644066":{"type":"test:constant","uuid":"1770317644066","pos":{"x":400,"y":-600},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":0,"drivers":[]}}},"1770317644067":{"type":"test:multiply","uuid":"1770317644067","pos":{"x":400,"y":-450},"elements":{"output":{"value":0,"drivers":[]},"arg0":{"value":0,"drivers":[["1770317644068","output"]]},"arg1":{"value":0,"drivers":[["1770317644069","output"]]}}},"1770317644068":{"type":"test:constant","uuid":"1770317644068","pos":{"x":0,"y":-600},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":11.328138001728803,"drivers":[]}}},"1770317644069":{"type":"test:random","uuid":"1770317644069","pos":{"x":0,"y":-300},"elements":{"output":{"value":0,"drivers":[]}}},"1770317644070":{"type":"test:palette","uuid":"1770317644070","pos":{"x":400,"y":150},"elements":{"output":{"value":0,"drivers":[]},"arg0":{"value":0,"drivers":[["1770317644071","output"]]},"arg1":{"value":0,"drivers":[["1770317644072","output"]]},"arg2":{"value":0,"drivers":[["1770317644078","output"]]}}},"1770317644071":{"type":"test:constant","uuid":"1770317644071","pos":{"x":-96.8838835250724,"y":-192.64218312086584},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":4.819652987411246,"drivers":[]}}},"1770317644072":{"type":"test:triplet_distance","uuid":"1770317644072","pos":{"x":0,"y":0},"elements":{"output":{"value":0,"drivers":[]},"arg0":{"value":0,"drivers":[["1770317644073","output"]]},"arg1":{"value":0,"drivers":[["1770317644077","output"]]}}},"1770317644073":{"type":"test:triplet","uuid":"1770317644073","pos":{"x":-400,"y":0},"elements":{"output":{"value":0,"drivers":[]},"arg0":{"value":0,"drivers":[["1770317644074","output"]]},"arg1":{"value":0,"drivers":[["1770317644075","output"]]},"arg2":{"value":0,"drivers":[["1770317644076","output"]]}}},"1770317644074":{"type":"test:constant","uuid":"1770317644074","pos":{"x":-800,"y":-300},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":-1.600741489233457,"drivers":[]}}},"1770317644075":{"type":"test:constant","uuid":"1770317644075","pos":{"x":-800,"y":0},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":-1.0941825905674243,"drivers":[]}}},"1770317644076":{"type":"test:constant","uuid":"1770317644076","pos":{"x":-800,"y":300},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":-2.0346468365067927,"drivers":[]}}},"1770317644077":{"type":"test:input","uuid":"1770317644077","pos":{"x":-400,"y":300},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":4,"drivers":[]}}},"1770317644078":{"type":"test:constant","uuid":"1770317644078","pos":{"x":0,"y":600},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":1,"drivers":[]}}},"1770317644079":{"type":"test:abs","uuid":"1770317644079","pos":{"x":400,"y":600},"elements":{"output":{"value":0,"drivers":[]},"arg0":{"value":0,"drivers":[["1770317644080","output"]]}}},"1770317644080":{"type":"test:input","uuid":"1770317644080","pos":{"x":0,"y":600},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":1,"drivers":[]}}},"1770317644081":{"type":"_group_output","uuid":"1770317644081","pos":{"x":1200,"y":0},"elements":{"Sequence":{"value":0,"drivers":[["1770317644065","output"]]}}}},"sockets":{"entries":{"Sequence":{"flow":"output","type":"test:sequence","target":"test:previewTarget"}},"selected":"Sequence"}},"Surface":{"nodes":{"1770317644572":{"type":"test:mask","uuid":"1770317644572","pos":{"x":775.1382266625824,"y":192.82845343623057},"elements":{"output":{"value":0,"drivers":[]},"arg0":{"value":0,"drivers":[["1770317644573","output"]]},"arg1":{"value":0,"drivers":[["1770317644587","output"]]},"arg2":{"value":0,"drivers":[["1770317644575","output"]]},"arg3":{"value":0,"drivers":[["1770317644589","output"]]}}},"1770317644573":{"type":"test:constant","uuid":"1770317644573","pos":{"x":82.8327412823139,"y":-137.7971499642826},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":0,"drivers":[]}}},"1770317644575":{"type":"test:palette","uuid":"1770317644575","pos":{"x":-86.39133292544737,"y":481.08859402900475},"elements":{"output":{"value":0,"drivers":[]},"arg0":{"value":0,"drivers":[["1770317644576","output"]]},"arg1":{"value":0,"drivers":[["1770317644577","output"]]},"arg2":{"value":0,"drivers":[["1770317644578","output"]]}}},"1770317644576":{"type":"test:constant","uuid":"1770317644576","pos":{"x":-625.2345465556307,"y":424.8355690686598},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":"6","drivers":[]}}},"1770317644577":{"type":"test:constant","uuid":"1770317644577","pos":{"x":-625.2345465556307,"y":724.8355690686599},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":1,"drivers":[]}}},"1770317644578":{"type":"test:constant","uuid":"1770317644578","pos":{"x":-625.2345465556307,"y":1024.8355690686599},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":1,"drivers":[]}}},"1770317644580":{"type":"_group_output","uuid":"1770317644580","pos":{"x":1085.9141495966244,"y":117.1453807375054},"elements":{"Sequence":{"value":0,"drivers":[["1770317644572","output"]]}}},"1770317644581":{"type":"test:noise","uuid":"1770317644581","pos":{"x":-249.24524343452902,"y":-93.34368829847584},"elements":{"output":{"value":0,"drivers":[]},"arg0":{"value":0,"drivers":[["1770317644585","output"]]},"arg1":{"value":0,"drivers":[["1770317644586","output"]]},"arg2":{"value":0,"drivers":[["1770317644582","output"]]},"arg3":{"value":0,"drivers":[["1770317644583","output"]]},"arg4":{"value":0,"drivers":[["1770317644584","output"]]}}},"1770317644582":{"type":"test:constant","uuid":"1770317644582","pos":{"x":-759.2958934055555,"y":66.28027199327997},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":"0.05","drivers":[]}}},"1770317644583":{"type":"test:constant","uuid":"1770317644583","pos":{"x":-705.7957978613241,"y":197.29231698742132},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":"0.5","drivers":[]}}},"1770317644584":{"type":"test:constant","uuid":"1770317644584","pos":{"x":-602.165691531553,"y":304.71376867072007},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":"0.5","drivers":[]}}},"1770317644585":{"type":"test:input","uuid":"1770317644585","pos":{"x":-609.0897511718775,"y":-208.43575186827758},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":0,"drivers":[]}}},"1770317644586":{"type":"test:input","uuid":"1770317644586","pos":{"x":-743.8931415195474,"y":-75.31740389995383},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":"1","drivers":[]}}},"1770317644587":{"type":"test:multiply","uuid":"1770317644587","pos":{"x":228.03722163745513,"y":61.88071766955109},"elements":{"output":{"value":0,"drivers":[]},"arg0":{"value":0,"drivers":[["1770317644581","output"]]},"arg1":{"value":0,"drivers":[["1770317644588","output"]]}}},"1770317644588":{"type":"test:constant","uuid":"1770317644588","pos":{"x":-169.10980003966444,"y":195.18601401323843},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":"15","drivers":[]}}},"1770317644589":{"type":"test:floor","uuid":"1770317644589","pos":{"x":636.2832330858322,"y":431.8797322139279},"elements":{"output":{"value":0,"drivers":[]},"arg0":{"value":0,"drivers":[["1770317644590","output"]]}}},"1770317644590":{"type":"test:divide","uuid":"1770317644590","pos":{"x":437.84204669527463,"y":455.49724843559085},"elements":{"output":{"value":0,"drivers":[]},"arg0":{"value":0,"drivers":[["1770317644587","output"]]},"arg1":{"value":0,"drivers":[["1770317644591","output"]]}}},"1770317644591":{"type":"test:constant","uuid":"1770317644591","pos":{"x":15.170804192534353,"y":653.219488909565},"elements":{"output":{"value":0,"drivers":[]},"data":{"value":"4","drivers":[]}}}},"sockets":{"entries":{"Sequence":{"flow":"output","type":"test:sequence","target":"test:previewTarget"}},"selected":"Sequence"}}},"selected":"Surface"}}`

export class Area {
    static AREA_MIN_SIZE = 50;

    constructor(stack) {
        const element = document.createElement('div');
        element.obj = this;
        this.stack = stack;
        this.element = element;
        this.size = { width: 0, height: 0 };
        element.className = 'area';
        element.addEventListener('mousemove', (evt) => {
            const rect = this.element.getBoundingClientRect();
            const margin = 10;
            const edge = {
                top: evt.pageY - rect.top < margin,
                bottom: rect.bottom - evt.pageY < margin,
                left: evt.pageX - rect.left < margin,
                right: rect.right - evt.pageX < margin
            }
            const isEdge = edge.top || edge.bottom || edge.left || edge.right;
            const isCorner = (edge.top || edge.bottom) && (edge.left || edge.right);
            if (isEdge && !isCorner) {
                //this.resizingAdjacent = this.stack?.children[Array.from(this.stack?.children).indexOf(this.element) + (edge.bottom || edge.right) - (edge.top || edge.left)];
                //if (!this.resizingAdjacent) return; //The abomination above determines the adjacent element to resize with
                this.cursorMode = 'edge';
                this.cursorEdge = edge;
                document.body.style.cursor = (edge.top || edge.bottom) ? 'ns-resize' : 'ew-resize';
            } else if (isCorner) {
                this.cursorMode = 'corner'
                document.body.style.cursor = 'crosshair';
            } else {
                this.cursorMode = 'normal'
                document.body.style.cursor = 'auto';
            }
        });
        element.addEventListener('mousedown', (evt) => {
            if (this.cursorMode !== 'corner') return;
            evt.preventDefault();
            this.creatingAdjacent = { x: evt.pageX, y: evt.pageY }; //The adjacent window is being dragged into existence
        })
        element.addEventListener('mousedown', (evt) => {
            if (this.cursorMode !== 'edge') return;
            evt.preventDefault();
            const edge = this.cursorEdge;
            this.resizingAdjacent = this.stack?.children[Array.from(this.stack?.children).indexOf(this.element) + (edge.bottom || edge.right) - (edge.top || edge.left)];
        })
        document.addEventListener('mousemove', (evt) => {
            if (!this.creatingAdjacent) return;
            const diff = { x: evt.pageX - this.creatingAdjacent, y: evt.pageY - this.creatingAdjacent };
            if (Math.abs(diff.x) < 10 || Math.abs(diff.y) < 10) return;
            const context = Math.abs(diff.x) > 10 ? 'horizontal' : 'vertical';
            if (this.stack?.className !== `areaStack_${context}`) {
                const ctxSizing = { horizontal: 'width', vertical: 'height' }[context];
                const idpSizing = { horizontal: 'height', vertical: 'width' }[context];
                if (this.size[ctxSizing] <= Area.AREA_MIN_SIZE) return;

                this.stack = document.createElement('div');
                this.stack.className = `areaStack_${context}`;
                this.stack.style.width = this.element.style.width;
                this.stack.style.height = this.element.style.height;
                this.element.parentElement.appendChild(this.stack);
                this.stack.appendChild(this.element);

                const newArea = new Area(this.stack);
                this.stack.appendChild(newArea.element);
                this.size[ctxSizing] -= Area.AREA_MIN_SIZE;
                newArea.size[ctxSizing] = Area.AREA_MIN_SIZE;
                newArea.size[idpSizing] = this.size[idpSizing];
                this.cursorMode = 'edge';
            }
        })
        document.addEventListener('mousemove', (evt) => {
            if (!this.resizingAdjacent) return;
            const rect = this.stack.getBoundingClientRect();
            const dimension = (this.cursorEdge.top || this.cursorEdge.bottom) ? 'height' : 'width';
            let mousePos = dimension === 'height' ? evt.pageY - rect.top : evt.pageX - rect.left;
            mousePos -= 15;
            const first = Array.from(this.stack.children).find(e => e === this.resizingAdjacent || e === this.element);
            const last = first === this.element ? this.resizingAdjacent : this.element;
            console.log(mousePos)
            last.obj.resizeOn(dimension, last.obj.size[dimension] + first.obj.size[dimension] - mousePos);
            first.obj.resizeOn(dimension, mousePos);
        })
        document.addEventListener('mouseup', (evt) => {
            this.resizingAdjacent = null;
        })
    }
    setSize(size = { width: 0, height: 0 }) {
        size.width = size.width ?? this.size.width;
        size.height = size.height ?? this.size.height;
        this.element.style.height = `${size.height}px`;
        this.element.style.width = `${size.width}px`;

        this.size = { ...size };
    }
    resizeOn(context, value) {
        const obj = {};
        obj[context] = value;
        this.setSize(obj);
    }
}



// document.addEventListener('DOMContentLoaded', (evt) => {
//     const stack = document.getElementById("root");
//     //stack.className = 'areaStack_vertical';
//     const a = new Area(stack);
//     const b = new Area(stack);
//     const halfSize = { width: document.body.clientWidth, height: document.body.clientHeight / 2 };
//     a.setSize(halfSize);
//     b.setSize(halfSize);
//     stack.appendChild(a.element);
//     stack.appendChild(b.element);
//     document.body.appendChild(stack);
// })


//NODE EDITOR CONTENT
class Editor {
    constructor(element) {
        //Element Setup
        this.element = element ?? document.createElement('div');
        this.element.className = `editor`

        //Shortcuts setup
        const keymap = {};
        this.shortcuts = {};
        this.setFocus = (focus) => {
            this.focused = focus;
        }
        const focusHandler = (evt) => this.setFocus(evt.type === `mouseenter`);
        this.element.addEventListener('mouseenter', focusHandler);
        this.element.addEventListener('mouseleave', focusHandler);
        document.body.addEventListener('keydown', (evt) => {
            if (!this.focused) return;
            if (evt.repeat) return;
            let key = evt.key.toLowerCase();
            keymap[key] = true;
            for (let shortcut in this.shortcuts) {
                let keys = shortcut.split('+');
                if (keys.every(e => keymap[e])) {
                    keys.forEach(e => keymap[e] = false);
                    this.shortcuts[shortcut]();
                }
            }
        })
        document.body.addEventListener('keyup', (evt) => {
            if (!this.focused) return;
            let key = evt.key.toLowerCase();
            keymap[key] = false;
        })

    }
}

class WorldPreview extends Editor {
    constructor(element) {
        super(element);
    }
}

class DatablockSelector {
    constructor(link, dropdown, onexit, onenter, template) {
        this.onexit = onexit ?? (() => 0);
        this.onenter = onenter ?? (() => 0);
        this.onupdate = [];
        this.link = link ?? {};
        this.link.entries ??= {};
        this.template = template;
        const groupSelect = this.element = document.createElement('div');
        groupSelect.className = 'datablockSelectionMenu';
        groupSelect.addEventListener('click', (evt) => {
            if (groupSelect.classList.contains(`datablockCreateBtn`)) this.create()
        })

        const dropdownBtn = document.createElement(`span`);
        if (dropdown instanceof EmbeddedDropdownList) {
            dropdown.callback = (e) => this.select(e);
            this.onupdate.push(() => dropdown.update(Object.keys(this.link.entries)));
            dropdownBtn.addEventListener('click', () => {
                dropdown.element.classList.toggle('displayNone')
            })
        }
        else if (dropdown) {
            let { dropdownWindow, mouse, toolbar } = dropdown;
            dropdownBtn.addEventListener('click', () => {
                let eRect = dropdownWindow.getBoundingClientRect();
                new DropdownList(Object.keys(this.link.entries), (e) => this.select(e)).showIn(dropdownWindow, {
                    x: mouse.x - eRect.left,
                    y: Math.max(mouse.y - eRect.top, toolbar.getBoundingClientRect().height)
                })
            })
        }
        dropdownBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path style="fill: white;" d="M104 112C90.7 112 80 122.7 80 136L80 184C80 197.3 90.7 208 104 208L152 208C165.3 208 176 197.3 176 184L176 136C176 122.7 165.3 112 152 112L104 112zM256 128C238.3 128 224 142.3 224 160C224 177.7 238.3 192 256 192L544 192C561.7 192 576 177.7 576 160C576 142.3 561.7 128 544 128L256 128zM256 288C238.3 288 224 302.3 224 320C224 337.7 238.3 352 256 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L256 288zM256 448C238.3 448 224 462.3 224 480C224 497.7 238.3 512 256 512L544 512C561.7 512 576 497.7 576 480C576 462.3 561.7 448 544 448L256 448zM80 296L80 344C80 357.3 90.7 368 104 368L152 368C165.3 368 176 357.3 176 344L176 296C176 282.7 165.3 272 152 272L104 272C90.7 272 80 282.7 80 296zM104 432C90.7 432 80 442.7 80 456L80 504C80 517.3 90.7 528 104 528L152 528C165.3 528 176 517.3 176 504L176 456C176 442.7 165.3 432 152 432L104 432z"/></svg>'
        groupSelect.appendChild(dropdownBtn);


        const nameField = document.createElement(`input`);
        this.nameField = nameField;
        nameField.addEventListener(`change`, (evt) => {
            this.lastChangedId = this.link.selected;
            if (nameField.value in this.link.entries || nameField.value.length === 0) {
                let curr = parseInt(nameField.value.split('.').at(-1));
                let rest = nameField.value.split('.').slice(0, -1).join('.') ?? "Untitled";
                if (isNaN(curr)) curr = 0;
                nameField.value = `${rest}.${curr + 1}`
            }
            this.link.entries[nameField.value] = this.link.entries[this.link.selected];
            delete this.link.entries[this.link.selected];
            this.link.selected = nameField.value;
            this.update();
        })
        const deleteBtn = document.createElement(`span`);
        deleteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path style="fill: white;" d="M504.6 148.5C515.9 134.9 514.1 114.7 500.5 103.4C486.9 92.1 466.7 93.9 455.4 107.5L320 270L184.6 107.5C173.3 93.9 153.1 92.1 139.5 103.4C125.9 114.7 124.1 134.9 135.4 148.5L278.3 320L135.4 491.5C124.1 505.1 125.9 525.3 139.5 536.6C153.1 547.9 173.3 546.1 184.6 532.5L320 370L455.4 532.5C466.7 546.1 486.9 547.9 500.5 536.6C514.1 525.3 515.9 505.1 504.6 491.5L361.7 320L504.6 148.5z"/></svg>';
        const createBtn = document.createElement(`span`);
        createBtn.innerHTML = '+';
        createBtn.addEventListener('click', () => this.create())
        deleteBtn.addEventListener('click', (evt) => {
            evt.stopPropagation();
            delete this.link.entries[this.link.selected];
            this.select(Object.keys(this.link.entries)[0]);
        })
        groupSelect.appendChild(nameField);
        groupSelect.appendChild(deleteBtn);
        groupSelect.appendChild(createBtn);
        this.load(this.link);
    }

    create() {
        let id = Math.max(...Object.keys(this.link.entries).filter(e => /Untitled\.\d+/.test(e)).map(e => parseInt(e.split('.')[1])), 0);
        let newId = `Untitled.${id + 1}`;
        this.link.entries[newId] = JSON.parse(JSON.stringify(typeof this.template === `function` ? this.template() : this.template));
        this.select(newId);
    }

    update() {
        this.onupdate.forEach(f => f());
        this.lastChangedId = undefined;
    }

    select(id, noUnload = false) {
        if (!id) {
            Array.from(this.element.children).forEach(c => c.style.display = 'none');
            this.element.classList.add(`datablockCreateBtn`);
        } else if (this.element.classList.contains(`datablockCreateBtn`)) {
            this.element.classList.remove(`datablockCreateBtn`);
            Array.from(this.element.children).forEach(c => c.style.display = '');
        }
        if (this.link.selected) {
            this.onexit?.(this.link.selected, noUnload);
        }
        this.nameField.value = id;
        this.link.selected = id;
        this.selectedEntry = this.link.entries[id];
        if (id) this.onenter?.(id);
        this.onupdate.forEach(f => f());
    }

    load(link) {
        this.link = link ?? {};
        this.link.entries ??= {};
        this.select(link.selected, true);
    }

    changeSelected(key, value) {
        this.selectedEntry[key] = value;
        this.update();
    }

    getSelected(key) {
        return this.selectedEntry[key];
    }
}

function createSettingsBox(content) {
    const element = document.createElement('div');
    element.className = `settingsBox`;
    let values = [];
    element.getFormValues = () => {
        render();
        return values.slice();
    };
    const render = () => {
        element.innerHTML = '';
        values.length = 0;
        addElement(content);
    }
    const addElement = (list) => {
        if (!Array.isArray(list)) list = [list];
        list.forEach((e) => {
            let field = document.createElement('input');
            field.type = e.type;
            if (`value` in e) field.value = e.value;
            field.addEventListener(`change`, (evt) => {
                if (e.type === `checkbox`) e.value = field.checked;
                else e.value = field.value;
                render();
            });
            if (e.type === `checkbox`) field.checked = e.value;
            element.appendChild(namedSetting(e.label, field));
            field.fieldValue = e.value;
            //console.log(`pushin' ${e.value} from `, e, `current idx: ${values.length}`)
            values.push(e.value);
            for (let [val, el] of e.conditions ?? []) if (e.value === val) addElement(el);
        })
    }
    render();

    return element;
}

class NodeEditor extends Editor {
    createDynamicLink(path) {
        return () => path.split(`/`).reduce((prev, curr) => {
            //console.log(prev)
            if (!prev) return;
            if (curr === '$selected') return prev.entries?.[prev.selected];
            if (!prev[curr]) prev[curr] = {};
            return prev[curr];

        }, this.file)
    }

    constructor(element, registry) {
        super(element);

        this.nodeGroupTemplate = {
            nodes: {},
            sockets: {}
        }

        //node editor initialization
        const editorWrapper = document.createElement('div');
        editorWrapper.style.height = `100%`;
        editorWrapper.style.width = `100%`;
        editorWrapper.className = `nodeEditorWrapper`;
        const editor = document.createElement('div');
        this.editor = editor;
        this.editor.registry = this.registry = registry ?? new NodeRegistry(`default`);
        this.editor.nodes = this.nodes = {};
        this.editor.file = this.file = {};
        editor.style.transformOrigin = `0px 0px`;
        editorWrapper.appendChild(editor);
        this.targets = {};
        const eRect = editor.getBoundingClientRect();
        const mouse = {
            x: eRect.left,
            y: eRect.top,
            oldX: 0,
            oldY: 0,
            isDragging: false,
            hoveredNode: null,
            isDraggingNodes: false,
            selectedNodes: new Set(),
            draggedConnector: null,
            hoveredSocket: null,
            disconnectedConnector: null,
            buttonId: null,
            selectionBox: null,
            nodeInsertion: null,
            emptySpaceClick: false
        };
        editor.mouse = mouse;
        editor.uuidCounter = Date.now();
        editor.view = new ViewSpace(editor);
        this.openModal = (title = 'Modal content', content, onconfirmation, oncancellation) => {
            const modal = document.createElement('div');
            modal.className = `nodeEditorModal`;
            modal.innerHTML = `<p>${title}</p>`
            let form = createSettingsBox(content);
            modal.appendChild(form);
            const confirmBtn = document.createElement('span');
            confirmBtn.className = `confirmationBtn`;
            confirmBtn.innerHTML = 'OK';
            modal.addEventListener(`mousedown`, (evt) => evt.stopPropagation());
            editorWrapper.addEventListener('mousedown', (evt) => {
                modal.remove();
                oncancellation?.();
            })
            modal.appendChild(confirmBtn);
            confirmBtn.addEventListener(`click`, (evt) => {
                modal.remove();
                onconfirmation?.(form.getFormValues());
            })
            editorWrapper.appendChild(modal);
        }
        editorWrapper.addEventListener('wheel', (evt) => {
            let fac = 1 + evt.deltaY * -0.0025;
            let eRect = editor.getBoundingClientRect();
            let f = editor.view.scale * fac
            editor.view.zoom({ x: (evt.pageX - eRect.left), y: (evt.pageY - eRect.top) }, fac);
        })
        editorWrapper.addEventListener('mousedown', (evt) => {
            mouse.oldX = evt.pageX;
            mouse.oldY = evt.pageY;
            mouse.emptySpaceClick = evt.target === editorWrapper;

            //if (mouse.hoveredNode && !mouse.draggedConnector) return; //i dont remember what it was for
            if (mouse.selectedNodes.size > 0 && !mouse.hoveredNode) mouse.selectedNodes.forEach(n => n.deselect());
            mouse.isDragging = true;
            mouse.buttonId = evt.button;
        })
        editorWrapper.addEventListener('mouseup', (evt) => {
            mouse.isDraggingNodes = false;
            mouse.isDragging = false;
            mouse.buttonId = null;

            if (mouse.draggedConnector) {
                if (mouse.disconnectedConnector) {
                    mouse.disconnectedConnector.node.propagateEvent('update');
                    mouse.disconnectedConnector = null;
                }
                mouse.draggedConnector.curve.remove();
                mouse.draggedConnector = null;
            }

            if (mouse.nodeInsertion) {
                let { driver, target, input, output } = mouse.nodeInsertion;
                target.disconnectDriver();
                input.connectDriver(driver);
                target.connectDriver(output);
                mouse.nodeInsertion = null;
            }

            if (mouse.selectionBox) {
                mouse.selectionBox.remove();
                mouse.selectionBox = null;
            }
        })

        element.addEventListener(`selectstart`, (evt) => evt.preventDefault())
        //editorWrapper
        element.addEventListener('mousemove', (evt) => {
            mouse.x = evt.pageX;
            mouse.y = evt.pageY;
            if (mouse.isDragging) {
                if (mouse.isDraggingNodes) {
                    mouse.selectedNodes.forEach(n => n.move({ x: (evt.pageX - mouse.oldX) / editor.view.scale, y: (evt.pageY - mouse.oldY) / editor.view.scale }))

                    if (mouse.selectedNodes.size === 1) {
                        let node = [...mouse.selectedNodes][0];
                        let elements = Object.values(node.elements);
                        let [input, output] = [elements.find(e => e.flow === `input` && e.getDrivers().length === 0), elements.find(e => e.flow === `output` && e.driving.size === 0)];
                        if (input && output) {
                            let socket = input.socket;
                            let drivers = mouse.nodeInsertion ? [mouse.nodeInsertion.driver] : Object.values(editor.nodes).flatMap(n => Object.values(n.elements)).filter(e => e.driving.size > 0 && e.node.uuid !== node.uuid && !e.driving.has(socket));
                            let nRect = node.element.getBoundingClientRect();
                            for (let driver of drivers) {
                                for (let targetSocket of (mouse.nodeInsertion ? [mouse.nodeInsertion.targetSocket] : driver.driving.keys())) {
                                    const [p1, p2] = [getAbsolutePos(driver.socket, editor, true), getAbsolutePos(targetSocket, editor, true)];
                                    const curve = driver.driving.get(targetSocket);
                                    if (!curve) continue;
                                    const cRect = curve.container.getBoundingClientRect();

                                    let intersection;
                                    if (
                                        cRect.right < nRect.left
                                        || cRect.left > nRect.right
                                        || cRect.bottom < nRect.top
                                        || cRect.top > nRect.bottom
                                    ) intersection = false;

                                    else {
                                        let angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
                                        let normal = {
                                            x: -Math.sin(angle),
                                            y: Math.cos(angle)
                                        }
                                        let [a, b] = [normal.x, normal.y]
                                        let c = - b * p1.y - a * p1.x;
                                        //console.log(a, b, c)
                                        let eRect = editor.getBoundingClientRect();
                                        intersection = Math.abs([nRect.left, nRect.right, nRect.top, nRect.bottom].reduce((prev, curr, i, arr) => {
                                            let p = {
                                                x: arr[i % 2] - eRect.left,
                                                y: arr[2 + Math.floor(i / 2)] - eRect.top
                                            }
                                            let val = p.x * a + p.y * b + c;

                                            return prev + Math.sign(val);
                                        }, 0)) < 4;

                                    }
                                    //console.log(intersection, mouse.nodeInsertion)
                                    if (intersection && !mouse.nodeInsertion) {
                                        driver.driving.get(targetSocket).path.setAttribute('class', 'nodeConnectorPreview');
                                        mouse.nodeInsertion = {
                                            driver,
                                            target: targetSocket.element,
                                            targetSocket,
                                            input,
                                            output
                                        }
                                        break;
                                    } else if (!intersection && mouse.nodeInsertion) {
                                        driver.driving.get(targetSocket).path.setAttribute('class', 'nodeConnector');
                                        //console.log('we had to')
                                        mouse.nodeInsertion = null;
                                    }
                                }

                            }
                        }

                    }
                } else if (mouse.draggedConnector) {
                    let pos;
                    if (mouse.hoveredSocket) {
                        pos = getAbsolutePos(mouse.hoveredSocket, editor);
                    } else {
                        pos = getMousePos(mouse, editor);
                    }
                    mouse.draggedConnector.curve.to(pos);
                } else if (!mouse.hoveredNode && mouse.buttonId === 1) {
                    editor.view.pan({ x: evt.pageX - mouse.oldX, y: evt.pageY - mouse.oldY });
                } else if (mouse.buttonId === 0 && mouse.emptySpaceClick) {
                    let pos = getMousePos(mouse, editor);
                    if (!mouse.selectionBox) {
                        mouse.selectionBox = document.createElement('div');
                        mouse.selectionBox.className = 'nodeSelectionBox';
                        editor.appendChild(mouse.selectionBox);
                        mouse.selectionBox.pos = { ...pos };
                    }
                    let oldPos = mouse.selectionBox.pos;
                    mouse.selectionBox.style = `left: ${Math.min(oldPos.x, pos.x)}px;top: ${Math.min(oldPos.y, pos.y)}px;width:${Math.abs(oldPos.x - pos.x)}px;height:${Math.abs(oldPos.y - pos.y)}px;`;
                    mouse.selectedNodes.forEach(node => node.deselect());
                    let selectionRect = mouse.selectionBox.getBoundingClientRect();
                    Object.values(editor.nodes).forEach(node => {
                        let nodeRect = node.element.getBoundingClientRect();
                        if (
                            nodeRect.left > selectionRect.right
                            || nodeRect.right < selectionRect.left
                            || nodeRect.top > selectionRect.bottom
                            || nodeRect.bottom < selectionRect.top
                        ) return;

                        node.select();
                    })
                }
            }
            mouse.oldX = evt.pageX;
            mouse.oldY = evt.pageY;
        })

        let toolbar;
        const contextMenus = {
            add: () => {
                const content = [
                    {
                        type: 'label',
                        text: 'Add'
                    }
                ]
                const submenus = {}
                for (const [id, nodeType] of Object.entries(this.editor.registry.nodeTypes)) {
                    const [namespace, category] = nodeType.category.split(`/`);
                    if (!submenus[namespace]) submenus[namespace] = {};
                    if (!submenus[namespace][category]) submenus[namespace][category] = [];
                    submenus[namespace][category].push({
                        type: 'button',
                        text: nodeType.name,
                        action: () => {
                            new EditorNode(id, editor, getMousePos(mouse, editor));
                        }
                    })
                }
                for (const [name, categories] of Object.entries(submenus)) {
                    content.push(
                        {
                            type: 'break'
                        },
                        {
                            type: 'label',
                            text: name
                        }
                    )
                    for (const [category, entries] of Object.entries(categories)) {
                        content.push(
                            {
                                type: 'submenu',
                                text: category,
                                content: entries
                            }
                        )
                    }
                }
                return content;
            }
        }
        const toolbarDropdown = (menu) => () => {
            let eRect = editorWrapper.getBoundingClientRect();
            new ContextMenu(typeof menu === 'function' ? menu() : menu).showIn(editorWrapper, {
                x: mouse.x - eRect.left,
                y: Math.max(mouse.y - eRect.top, toolbar.getBoundingClientRect().height)
            }
            )
        }
        const toolbarComponent = (options) => {
            const element = document.createElement('div');
            element.classList.add('toolbarComponent');
            if (options.style) element.classList.add(`toolbarComponent_${options.style}`);
            if (options.title) element.innerHTML = options.title;
            if (options.dropdownContent) options.action = toolbarDropdown(options.dropdownContent)
            if (options.action) element.addEventListener('click', (evt) => {
                options.action();
            })

            return element;
        }

        const editorToolbar = this.editorToolbar = (components) => {
            const container = document.createElement('div');
            container.className = 'editorToolbarContainer';
            //components.unshift({ title: 'Editor', style: 'dropdown' });


            container.setToolbarContent = (content) => {
                container.innerHTML = '';
                for (const component of components) container.appendChild(component.type === `element` ? component.element : toolbarComponent(component));
            }
            container.setToolbarContent(components);
            return container;
        }
        const editorDropdown = (menu) => () => {
            new ContextMenu(typeof menu === 'function' ? menu() : menu).showIn(getMousePos(mouse, editor))
        }

        this.sidebar = editorSidebar();
        editorWrapper.appendChild(this.sidebar);
        const sidebarContent = document.createElement('div');
        sidebarContent.className = 'sidebarContent';
        const label = document.createElement('span');
        label.innerHTML = 'Group sockets';
        let socketList = new EmbeddedDropdownList([]);
        let link = this.createDynamicLink(`nodeGroups/$selected/sockets/entries`);
        socketList.mapper = (id) => {
            let entry = link()[id];
            let type = this.registry.dataTypes[entry.type];
            return ({
                label: id,
                selected: this.file.nodeGroups.entries[this.file.nodeGroups.selected].sockets.selected === id,
                id,
                svg: applyAttribute(this.registry.shapes[type.shape], 'style', `fill: ${type.color}`),
                reverse: entry.flow === `output`
            })
        }
        const socketSettings = document.createElement('div');
        socketSettings.style.width = '100%';
        const updateGroupNodes = () => {
            for (let flow of [`input`, `output`]) {
                let typeId = `_group_${flow}`;
                let type = this.registry.nodeTypes[typeId];
                type.elements = Object.fromEntries(
                    Object.entries(link()).filter(([_, v]) => v.flow === flow).map(([id, { type, target }]) => {
                        let result = {
                            type, flow: flow === `input` ? `output` : `input`, driver_only: true, label: id
                        }
                        if (target !== `none` && target) result[flow === `input` ? `eval` : `callback`] = this.registry.targets[target].eval;
                        return [id, result]
                    })
                );
                Object.values(this.nodes).filter(n => n.typeId === typeId).forEach(node => {
                    if (socketSelector.lastChangedId && socketSelector.lastChangedId in node.elements) {
                        node.elements[socketSelector.link.selected] = node.elements[socketSelector.lastChangedId];
                        delete node.elements[socketSelector.lastChangedId];
                    }
                    Object.keys(node.elements).filter(k => !(k in type.elements) ||
                        node.elements[k]?.type !== type.elements[k].type
                        || node.elements[k]?.flow !== type.elements[k].flow
                    ).forEach(k => {
                        let el = node.elements[k];
                        if (el.driving.size > 0) [...el.driving.keys()].forEach(s => s.element.disconnectDriver(s));
                        if (el.drivers.size > 0) [...el.drivers.keys()].forEach(s => el.disconnectDriver(s));
                        el.remove();
                        delete node.elements[k];
                    });
                    Object.keys(type.elements).filter(k => !(k in node.elements)).forEach(k => {
                        node.addElement(k);
                    });
                });
            }
        }
        let defaultType = Object.keys(this.registry.dataTypes)[0];
        let socketSelector = new DatablockSelector({}, socketList, undefined, (id) => {
            let currentFlow = socketSelector.selectedEntry.flow;
            const flowSelectBox = dropdownBox(['Input', 'Output'], currentFlow.replace(/^./, char => char.toUpperCase()) ?? 'Input');
            const typeSelectBox = dropdownBox(Object.entries(this.registry.dataTypes).map(([id, type]) => {
                return {
                    label: type.name,
                    svg: applyAttribute(this.registry.shapes[type.shape], 'style', `fill: ${type.color}`),
                    id
                }
            }), socketSelector.selectedEntry.type ?? defaultType);
            let targets = this.registry.targets;
            let getTargetList = () => [{ label: `None`, id: `none` }].concat(
                Object.entries(targets).map(([id, data]) => ({ ...data, id })).filter(data =>
                    data.flow === socketSelector.getSelected('flow') &&
                    data.type === socketSelector.getSelected('type')
                )
            )
            let targetSelectBox = dropdownBox(getTargetList, socketSelector.selectedEntry.target ?? `none`, true);
            let validateTarget = (prop, val) => {
                let selectedTarget = socketSelector.getSelected('target');
                if (selectedTarget !== `none` && selectedTarget && targets[selectedTarget][prop] !== val) targetSelectBox.dropdownSelect('none');
            }
            typeSelectBox.addEventListener('change', (evt) => {
                socketSelector.changeSelected('type', typeSelectBox.value.id);
                validateTarget('type', typeSelectBox.value.id);
            });
            const target = namedSetting(`Target`, targetSelectBox);
            targetSelectBox.addEventListener('change', (evt) => {
                socketSelector.changeSelected('target', targetSelectBox.value.id);
            });
            flowSelectBox.addEventListener('change', (evt) => {
                let id = flowSelectBox.value.id.toLowerCase()
                socketSelector.changeSelected('flow', id);
                validateTarget('flow', id);
            });
            const flowType = namedSetting(`Flow`, flowSelectBox);
            const type = namedSetting(`Type`, typeSelectBox);

            socketSettings.innerHTML = '';
            socketSettings.append(flowType, type, target);
        }, { flow: `input`, type: defaultType, target: `none` });
        socketSelector.onupdate.push(updateGroupNodes);
        sidebarContent.append(label, socketList.element, socketSelector.element, socketSettings);
        this.sidebar.element.appendChild(sidebarContent);


        const stopPropagation = (evt) => evt.stopPropagation();
        this.sidebar.addEventListener('keydown', stopPropagation);
        this.sidebar.addEventListener(`wheel`, stopPropagation);
        this.shortcuts = {
            'shift+a': () => new ContextMenu(contextMenus.add()).showIn(editor, getMousePos(mouse, editor)),
            'delete': () => {
                mouse.selectedNodes.forEach(n => n.remove());
            },
            'shift+d': () => {
                if (mouse.selectedNodes.size === 0) return;
                let buffer = {}
                mouse.selectedNodes.forEach(node => {
                    node.deselect();
                    buffer[node.uuid] = node;
                });
                let nodesJSON = this.exportNodesToJSON(buffer);
                Object.entries(nodesJSON).forEach(([key, value]) => Object.values(value.elements).forEach(e => {
                    if (!e.drivers) return;
                    e.drivers = e.drivers.filter(([k, s]) => k in nodesJSON)
                }))
                this.importNodesFromJSON(nodesJSON).forEach((node) => node.select());
                mouse.isDragging = true;
                mouse.isDraggingNodes = true;
            },
            'n': this.sidebar.toggleSidebar
        }
        this.toolbarContent = [{
            title: 'File', style: 'dropdown', dropdownContent: [
                {
                    type: 'button',
                    text: `New`,
                    action: () => this.newFile()
                },
                {
                    type: 'button',
                    text: `Save`,
                    action: () => {
                        const string = JSON.stringify(this.exportFile(), null, 2);
                        const blob = new Blob([string], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `nodes.json`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                    }
                },
                {
                    type: 'button',
                    text: `Load`,
                    action: () => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.style.display = 'none';
                        input.accept = 'application/json'
                        document.body.appendChild(input);
                        input.addEventListener('change', (evt) => {
                            let reader = new FileReader();
                            reader.onload = (e) => {
                                this.importFile(JSON.parse(e.target.result));
                                document.body.removeChild(input);
                            }
                            let file = input.files[0];
                            reader.readAsText(file);
                        })
                        input.click();
                    }
                }
            ]
        }, { title: 'Add', action: toolbarDropdown(contextMenus.add) }];

        toolbar = editorToolbar(this.toolbarContent);
        toolbar.addEventListener('keydown', stopPropagation);
        editor.toolbar = this.toolbar = toolbar;
        this.groupSelect = new DatablockSelector(
            this.file.nodeGroups, { dropdownWindow: editorWrapper, mouse, toolbar },
            (id, noUnload) => {
                if (id in this.file.nodeGroups.entries && !noUnload) this.file.nodeGroups.entries[id].nodes = this.exportNodesToJSON();
                this.getNodes().forEach(n => n.remove());

            },
            (id) => {
                updateGroupNodes()
                this.importNodesFromJSON(this.file.nodeGroups.entries[id].nodes);
                socketSelector.load(this.file.nodeGroups.entries[id].sockets);
            },
            () => this.nodeGroupTemplate
        );
        this.groupSelect.element.style.marginLeft = '60px';
        this.groupSelect.element.style.marginRight = 'auto';
        this.toolbarContent.push({ type: `element`, element: this.groupSelect.element })
        this.updateToolbar()
        element.addEventListener(`mousemove`, (evt) => {
            if (Object.keys(this.groupSelect.link.entries).length === 0) {
                this.setFocus(false);
                evt.stopPropagation();
                evt.stopImmediatePropagation();
                this.sidebar.style.display = 'none';
            } else {
                this.setFocus(true);
                this.sidebar.style.display = '';
            }
        })


        //other stuff
        this.element.appendChild(toolbar);
        this.element.appendChild(editorWrapper);
        window.addEventListener('beforeunload', (evt) => {
            localStorage.setItem('cachedFile', JSON.stringify(this.exportFile()));
        });
        let cachedFile = localStorage.getItem(`cachedFile`);
        if (cachedFile && JSON.parse(cachedFile).version > 1) this.importFile(JSON.parse(cachedFile), true);
        else this.importFile(JSON.parse(defaultFile))
    }
    updateToolbar() {
        this.toolbar.innerHTML = ``;
        this.toolbar.appendChild(this.editorToolbar(this.toolbarContent))
    }
    newFile() {
        this.importFile({
            version: 2,
            nodeGroups: {
                entries: {
                    New: JSON.parse(JSON.stringify(this.nodeGroupTemplate))
                },
                selected: `New`
            }
        })
    }
    getNodes() {
        return Object.values(this.nodes);
    }
    exportNodesToJSON(nodes) {
        nodes ??= this.editor.nodes;
        return Object.fromEntries(Object.entries(nodes).map(([uuid, n]) => [uuid, n.toJSON()]))
    }
    importNodesFromJSON(nodes) {
        let result = [];
        let uuidMap = Object.fromEntries(Object.entries(nodes).map(([uuid, data]) => {
            let node = new EditorNode(data.type, this.editor, data.pos);
            result.push(node);
            return [node.uuid, uuid];
        }))
        let reverseMap = Object.fromEntries(Object.entries(uuidMap).map(([k, v]) => [v, k]));
        for (let node of result) {
            let nodeData = nodes[uuidMap[node.uuid]];
            if (!nodeData) console.log(uuidMap, nodes)
            for (let [id, element] of Object.entries(node.elements)) {
                let elementData = nodeData.elements?.[id];
                if (!elementData) {
                    console.log(id, nodeData);
                    continue;
                }
                if (elementData.driver) elementData.drivers = [elementData.driver]
                if (elementData.drivers) for (let entry of elementData.drivers) {
                    let [nodeId, elementId] = entry;
                    const driver = this.editor.nodes[reverseMap[nodeId]]?.elements[elementId];
                    if (!driver) console.warn(reverseMap, nodeId, elementId);
                    element.connectDriver(driver);
                }
                element.setValue(elementData.value);
            }
        }
        return result;
    }
    exportFile() {
        let current = this.file.nodeGroups.entries[this.file.nodeGroups.selected];
        if (current) current.nodes = this.exportNodesToJSON();
        return this.file;
    }
    importFile(file) {
        this.file = file;
        if (!file.nodeGroups.selected && Object.keys(file.nodeGroups.entries).length > 0) file.nodeGroups.selected = Object.keys(file.nodeGroups.entries)[0];
        this.groupSelect.load(file.nodeGroups);
        Object.values(this.nodes).filter(n => n.typeId === `_group_output`).forEach(n => n.propagateEvent('update'))
    }
}

//INIT

const editor = document.getElementById('editor');

//curve graphics
function getAbsolutePos(element, editor, ignoreScale = false) {
    const eRect = editor.getBoundingClientRect();
    const rect = element.getBoundingClientRect();
    const avg = {
        x: rect.left + rect.width / 2 - eRect.left,
        y: rect.top + rect.height / 2 - eRect.top
    }
    let fac = ignoreScale ? 1 : editor.view.scale
    return { x: avg.x / fac, y: avg.y / fac }
}
function getMousePos(mouse, editor, ignoreScaling = false) {
    const eRect = editor.getBoundingClientRect();
    let fac = (ignoreScaling ? 1 : editor.view.scale);
    return { x: (mouse.x - eRect.left) / fac, y: (mouse.y - eRect.top) / fac }
}
class ConnectorCurve {
    constructor(p1, p2, editor) {
        this.container = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        this.container.style.position = 'absolute';
        this.path.setAttribute('class', 'nodeConnector');
        this.container.appendChild(this.path);

        this.p1 = { x: p1.x, y: p1.y };
        this.p2 = { x: p2.x, y: p2.y };
        this.update()
        editor.firstChild.before(this.container);
    }
    update() {
        const shift = {
            x: Math.min(this.p1.x, this.p2.x),
            y: Math.min(this.p1.y, this.p2.y)
        }
        const diff = {
            x: Math.abs(this.p2.x - this.p1.x),
            y: Math.abs(this.p2.y - this.p1.y)
        }
        this.container.style.left = `${shift.x}px`;
        this.container.style.top = `${shift.y}px`;
        this.container.style.width = `${diff.x}px`;
        this.container.style.height = `${diff.y}px`;
        this.container.setAttribute('viewBox', `${shift.x} ${shift.y} ${diff.x} ${diff.y}`);

        this.path.setAttribute('d', `M ${this.p1.x} ${this.p1.y} L ${this.p2.x} ${this.p2.y}`);
    }
    from(p) {
        this.p1 = { x: p.x, y: p.y };
        this.update()
    }
    to(p) {
        this.p2 = { x: p.x, y: p.y };
        this.update()
    }
    remove() {
        this.container.remove()
    }
}


function numberInputField(element, options = {}) {
    const input = document.createElement('input');
    input.type = 'number';
    input.className = 'nodeInputField_number'
    input.value = element.value;
    input.step = options.step ?? 1;
    input.min = options.min ?? Number.MIN_SAFE_INTEGER;
    input.max = options.max ?? Number.MAX_SAFE_INTEGER;
    let stepUp = document.createElement('div');
    let stepDown = document.createElement('div');
    let stepUpTriangle = document.createElement('div');
    let stepDownTriangle = document.createElement('div');
    stepUpTriangle.className = 'stepup_triangle';
    stepDownTriangle.className = 'stepdown_triangle';
    stepUp.className = 'stepup'
    stepDown.className = 'stepdown';
    stepUp.appendChild(stepUpTriangle);
    stepDown.appendChild(stepDownTriangle);

    stepUp.addEventListener('mousedown', (evt) => {
        input.stepUp();
        input.dispatchEvent(new Event('change'));
    })
    stepDown.addEventListener('mousedown', (evt) => {
        input.stepDown();
        input.dispatchEvent(new Event('change'));
    })
    input.addEventListener('change', (evt) => {
        element.setValue(input.value);
    })
    element.addChangeListener(() => input.value = element.value);

    const el = document.createElement('div');
    el.className = 'nodeInputField_number_container';
    el.appendChild(input);
    el.appendChild(stepUp);
    el.appendChild(stepDown);
    return el;
}
const nodeTypes = {
    // basic: {
    //     name: 'Basic',
    //     category: 'Minecraft/Standard',
    //     color: '#BB0000',
    //     elements: {
    //         output: {
    //             type: 'df',
    //             flow: 'output',
    //             label: 'Output'
    //         },
    //         argument: {
    //             type: 'int',
    //             flow: 'input',
    //             label: 'Constant'
    //         }
    //     },
    //     compile: `{ "type": "constant", "argument": "[[]]" }`
    // }
}

class NodeRegistry {
    nodeTypes = {};
    dataTypes = {};
    targets = {};
    shapes = {};

    constructor(namespace) {
        this.nodeTypes = {
            _group_input: {
                name: 'Group input',
                category: 'Basic/Group',
                color: '#273527',
                elements: {
                }
            },
            _group_output: {
                name: 'Group output',
                category: 'Basic/Group',
                color: '#273527',
                elements: {
                },
                events: {
                    update: (node) => {
                        Object.entries(this.nodeTypes._group_output.elements)
                            .forEach(([id, e]) => {
                                if (node.errorBox) node.clearError();
                                if (e.callback) {
                                    try {
                                        e.callback?.(node.elements[id].getValue())
                                    } catch (e) {
                                        node.showError(`Target returned an error`);
                                    }
                                }
                            })
                    }
                }
            }
        };
        this.dataTypes = {};
        this.shapes = {
            circle: `<circle cx="320" cy="320" r="320"></circle>`
        }
        this.namespace = namespace;

        if (namespace === 'default') {
            this.registerTypes({
                float: {
                    field: {
                        create: numberInputField
                    },
                    color: '#a1a1a1'
                },
                int: {
                    field: {
                        create: numberInputField
                    },
                    color: '#00BB00'
                }
            })
        }

    }
    registerNodes(obj) {
        for (let [nodeId, nodeData] of Object.entries(obj)) {
            if (nodeData.elements) for (let obj of Object.values(nodeData.elements)) if (!obj.type?.includes(':')) obj.type = `${this.namespace}:${obj.type}`
            this.nodeTypes[`${this.namespace}:${nodeId}`] = nodeData;
        };
    }
    registerTypes(obj) {
        for (let [typeId, typeData] of Object.entries(obj)) {
            if (!typeData.shape?.includes(':') && typeData.shape) typeData.shape = `${this.namespace}:${typeData.shape}`;
            else if (!typeData.shape) typeData.shape = `circle`;
            this.dataTypes[`${this.namespace}:${typeId}`] = typeData;
        }
    }
    registerTargets(obj) {
        for (let [id, data] of Object.entries(obj)) {
            if (!data.type?.includes(':')) data.type = `${this.namespace}:${data.type}`
            this.targets[`${this.namespace}:${id}`] = data;
        }
    }
    registerShapes(obj) {
        for (let [id, data] of Object.entries(obj)) {
            this.shapes[`${this.namespace}:${id}`] = data;
        }
    }
    mergeWith(registry) {
        Object.assign(this.nodeTypes, registry.nodeTypes);
        Object.assign(this.dataTypes, registry.dataTypes);
    }
}
//Object.entries(masterNodes).forEach(([id, type]) => nodeTypes[`MASTER_${id}`] = type); //Master nodes are treated like regular ones

class NodeElement {
    constructor(options) {
        this.type = options.type ?? 'int';
        this.label = options.label ?? '';
        this.value = options.default ?? 0;
        this.id = options.id;
        this.node = options.node; //parent node
        this.editor = this.node.editor;
        this.flow = options.flow;
        this.eval = options.eval;

        const mouse = this.editor.mouse;
        this.changeListeners = [];

        const dataType = this.editor.registry.dataTypes[this.type];
        this.collection = dataType.collection;
        const element = document.createElement('div');
        const label = document.createElement('p');
        const field = dataType.field?.create(this, dataType.field.options);
        this.field = field;
        element.className = 'nodeElement';
        if (this.collection) element.classList.add('nodeCollectionElement');
        label.className = 'nodeText';
        label.innerHTML = this.label;
        element.appendChild(label);
        if (this.flow !== `output` && !options.driver_only && field) element.appendChild(field);
        this.element = element;
        this.drivers = new Map(); //socket-element
        this.driving = new Map(); //socket-curve
        this.socketContainer = document.createElement('div');
        this.socketContainer.className = `nodeSocketContainer`;
        if (this.collection) this.socketContainer.classList.add(`nodeSocketCollectionContainer`);
        // if (dataType.collection) {
        //     this.sockets = new Map(); //map between socket and driver
        //     this.socketContainer = document.createElement('div');
        //     this.socketContainer.className = `nodeSocketContainer`;
        //     label.before(this.socketContainer);
        //     this.addSocket = (socket) => {
        //         this.sockets.set(socket, undefined);
        //         this.socketContainer.appendChild(socket);
        //     }
        //     this.removeSocket = (socket) => {
        //         this.sockets.delete(socket);
        //         socket.remove();
        //     }
        // }
        this.addSocket = (flow) => {
            const socket = document.createElement('div');
            socket.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style="
            position: absolute;
            overflow: visible;
                ">${applyAttribute(this.editor.registry.shapes[dataType.shape], `style`, `fill: ${dataType.color};stroke:black;stroke-width: 1px;vector-effect: non-scaling-stroke;`)}</svg>`
            socket.className = `nodeSocket nodeSocket_${flow}`;
            socket.index = this.drivers.size;
            socket.element = this;
            if (flow === `input`) {
                socket.addEventListener('mouseenter', (evt) => {
                    //when hovered as a connection candidate
                    if (!mouse.draggedConnector) return;
                    if (mouse.draggedConnector.node === this.node) return;

                    mouse.hoveredSocket = socket;
                    this.socket = socket;
                    let driver = this.drivers.get(socket);
                    if (driver) {
                        driver.driving.get(socket).container.style.display = 'none';
                    }
                    this.setFieldVisibility(false);
                })
                socket.addEventListener('mouseleave', (evt) => {
                    //when unhovered
                    if (mouse.hoveredSocket !== socket) return;
                    mouse.hoveredSocket = null;
                    let driver = this.drivers.get(socket);
                    if (!driver) this.setFieldVisibility(true);
                    else driver.driving.get(socket).container.style.display = '';
                })
                socket.addEventListener('mouseup', (evt) => {
                    //when connected to a driver
                    if (!mouse.draggedConnector) return;
                    if (mouse.draggedConnector.node === this.node) return;
                    this.socket = socket;

                    let driver = this.drivers.get(socket);
                    if (driver) driver.stopDriving(socket);
                    //event was here but it makes more sense to call it after
                    this.connectDriver(mouse.draggedConnector);
                    mouse.draggedConnector = null;

                    this.node.propagateEvent('update');
                })
                socket.addEventListener('mousedown', (evt) => {
                    //when disconnected from a driver
                    evt.preventDefault();
                    if (!this.drivers.get(socket)) return;
                    if (dataType.collection) {
                        if (socket.index === this.drivers.size - 2) this.removeSocket(Array.from(this.drivers.keys()).at(-1))
                    }
                    mouse.draggedConnector = this.drivers.get(socket);

                    mouse.disconnectedConnector = this;
                    this.disconnectDriver(socket, true);

                })
            } else if (flow === 'output') {
                socket.addEventListener('mousedown', (evt) => {
                    evt.preventDefault();
                    this.editor.mouse.draggedConnector = this;
                    this.curve = new ConnectorCurve(getAbsolutePos(socket, this.editor), getAbsolutePos(socket, this.editor), this.editor);
                })
            }
            this.drivers.set(socket, undefined);
            this.socketContainer.appendChild(socket);
        }
        this.removeSocket = (socket) => {
            this.drivers.delete(socket);
            socket.remove();
        }



        if (options.flow === 'input') {
            this.addSocket(`input`);
            element.style.justifyContent = 'start';
            label.before(this.socketContainer);
        } else if (options.flow === 'output') {
            this.ignore = true;
            this.addSocket(`output`);
            element.style.justifyContent = 'end';
            element.appendChild(this.socketContainer);
        }
        if (!this.collection) this.socket = [...this.drivers.keys()][0];
    }
    getDrivers() {
        return [...this.drivers.values()].filter(e => e);
    }
    connectDriver(driver, socket) {
        socket ??= Array.from(this.drivers).find(([s, e]) => !e)?.[0];
        if (!socket) return;
        if (this.collection) {
            if (socket.index === this.drivers.size - 1) {
                this.addSocket(this.flow);
            }
        }
        this.drivers.set(socket, driver);
        driver.driving.set(socket, driver.curve ??
            new ConnectorCurve(getAbsolutePos(driver.socket, this.editor), getAbsolutePos(socket, this.editor), this.editor)
        );
        this.setFieldVisibility(false);
        this.node.update();
    }
    disconnectDriver(socket, saveCurve = false) {
        socket ??= this.socket;
        let driver = this.drivers.get(socket);
        if (!driver) return;
        let curve = driver.driving.get(socket);
        if (saveCurve) driver.curve = curve;
        else curve.remove();
        driver.driving.delete(socket);
        this.drivers.set(socket, undefined);
        this.setFieldVisibility(true);
    }
    stopDriving(socket) {
        this.driving.get(socket).remove();
        socket.element.drivers.set(socket, undefined);
        this.driving.delete(socket);
    }
    setFieldVisibility(visible) {
        if (!this.field) return;
        this.field.style = "display: none;".repeat(Number(!visible))
    }
    addChangeListener(callback) {
        this.changeListeners.push(callback);
    }
    setValue(value) {
        this.value = value;
        for (let callback of this.changeListeners) callback();
        this.node.propagateEvent(`update`)
    }
    getValue() {
        if (this.eval) {
            return this.eval(this.node);
        } else if (this.collection) {
            return Array.from(this.drivers.values()).map(driver => driver?.getValue()).filter(e => e != undefined);
        }
        let driver = this.drivers.get(this.socket);
        if (driver) {
            return driver.getValue();
        } else {
            return this.value;
        }
    }
    remove() {
        this.element.remove();
    }
}
class EditorNode {
    constructor(typeId, editor, pos) {
        const type = editor.registry.nodeTypes[typeId];
        this.typeId = typeId;
        this.type = type;
        this.editor = editor;
        this.uuid = (editor.uuidCounter++).toString();
        editor.nodes[this.uuid] = this;
        const element = document.createElement('div');
        const header = this.header = document.createElement('div');
        const title = document.createElement('p');

        element.className = 'node';
        element.appendChild(header);
        header.className = 'node_header';
        header.style.backgroundColor = type.color;
        header.appendChild(title);
        title.className = 'node_title';
        title.innerHTML = type.name;
        this.element = element;
        this.pos = { x: pos.x, y: pos.y };

        this.elements = {};
        for (let id of Object.keys(type.elements)) {
            this.addElement(id);
        }
        //this.elements.type = { getValue: () => typeId }; //A dummy element used in compilation //why???

        header.addEventListener('mousedown', (e) => {
            e.preventDefault();
            if (e.button !== 0) return;
            if (!this.selected) return;
            this.editor.mouse.isDraggingNodes = true;
            const element = this.element;
            editor.appendChild(element);
        })
        element.addEventListener('mousedown', (e) => {
            if (this.editor.mouse.selectedNodes && !this.editor.mouse.selectedNodes.has(this)) this.editor.mouse.selectedNodes.forEach(n => n.deselect());
            this.select();
        }, { capture: true })
        element.addEventListener('mouseover', (e) => {
            this.editor.mouse.hoveredNode = element;
        })
        element.addEventListener('mouseout', (e) => {
            this.editor.mouse.hoveredNode = null;
        })

        editor.appendChild(element);
        this.update()
    }
    showError(msg) {
        if (this.errorBox) this.clearError();
        this.errorBox = document.createElement('span');
        this.errorBox.className = `editorErrorBox`
        let errorPopup = this.errorPopup = document.createElement('div');
        errorPopup.innerHTML = msg;
        errorPopup.className = `editorPopupMessage`;
        this.errorBox.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="white" d="M320 64C334.7 64 348.2 72.1 355.2 85L571.2 485C577.9 497.4 577.6 512.4 570.4 524.5C563.2 536.6 550.1 544 536 544L104 544C89.9 544 76.8 536.6 69.6 524.5C62.4 512.4 62.1 497.4 68.8 485L284.8 85C291.8 72.1 305.3 64 320 64zM320 416C302.3 416 288 430.3 288 448C288 465.7 302.3 480 320 480C337.7 480 352 465.7 352 448C352 430.3 337.7 416 320 416zM320 224C301.8 224 287.3 239.5 288.6 257.7L296 361.7C296.9 374.2 307.4 384 319.9 384C332.5 384 342.9 374.3 343.8 361.7L351.2 257.7C352.5 239.5 338.1 224 319.8 224z"/></svg>`;

        this.errorBox.addEventListener('mouseenter', (evt) => {
            this.header.appendChild(errorPopup);
        });
        this.errorBox.addEventListener('mouseleave', (evt) => {
            this.header.removeChild(errorPopup);
        })
        this.header.appendChild(this.errorBox);
    }
    clearError() {
        if (!this.errorBox) return;
        if (this.errorPopup) {
            this.errorPopup.remove();
            this.errorPopup = undefined;
        }
        this.errorBox.remove();
        this.errorBox = undefined;
    }
    addElement(id) {
        let options = { ...this.type.elements[id] };
        options.node = this;
        options.id = id;
        this.elements[id] = new NodeElement(options);
        this.element.appendChild(this.elements[id].element);
    }
    toJSON() {
        return {
            type: this.typeId,
            uuid: this.uuid,
            pos: { ...this.pos },
            elements: Object.fromEntries(Object.entries(this.elements).map(([id, e]) => [id, {
                value: e.value,
                drivers: [...e.drivers.values()].filter(e => e).map(e => [e.node.uuid, e.id])
            }]))
        }
    }
    compile() {
        const obj = {};
        for (const [id, element] of Object.entries(this.elements)) {
            if (element.ignore) continue; //Entries ignored in compilation
            obj[id] = element.getValue();
        }
        return obj;
    }
    select() {
        this.selected = true;
        const element = this.element;
        this.editor.mouse.selectedNodes.add(this);
        element.style.outline = '3px solid white';
        element.style.borderRadius = '5px';
    }
    deselect() {
        this.selected = false;
        const element = this.element;
        this.editor.mouse.selectedNodes.delete(this);
        element.style.outline = '';
    }
    move(offset) {
        this.pos.x += offset.x;
        this.pos.y += offset.y;
        this.update();
    }
    update() {
        this.element.style.translate = `${this.pos.x}px ${this.pos.y}px`;
        for (const [id, element] of Object.entries(this.elements)) {
            [...element.drivers.values()].filter(e => e).forEach(e => [...e.driving].filter(([k, v]) => element.drivers.has(k)).forEach(([s, c]) => c.to(getAbsolutePos(s, this.editor))));
            [...element.driving].forEach(([s, c]) => c.from(getAbsolutePos(element.socket, this.editor)));
        }


    }
    remove() {
        for (const [id, element] of Object.entries(this.elements)) {
            [...element.drivers.keys()].forEach(s => element.disconnectDriver(s));
            [...element.driving.keys()].forEach(s => s.element.disconnectDriver(s));
        }
        this.editor.mouse.selectedNodes.delete(this);
        this.editor.mouse.hoveredNode = null;
        delete this.editor.nodes[this.uuid];
        this.element.remove();
    }
    propagateEvent(eventId) {
        if (this.type.events?.[eventId]) this.type.events[eventId](this);

        for (const [id, element] of Object.entries(this.elements)) {
            [...element.driving.keys()].forEach(s => s.element.node.propagateEvent(eventId));
        }
    }
}

//VIEWPORT
class ViewSpace {
    constructor(element) {
        this.pos = { x: 0, y: 0 };
        this.scale = 1;
        this.element = element;
        this.pan({ x: 0, y: 0 })
    }
    pan(offset) {
        this.pos.x += offset.x;
        this.pos.y += offset.y;
        this.update();
    }
    zoom(origin, factor) {

        this.pos.x += (origin.x - this.scale) * (1 - factor);
        this.pos.y += (origin.y - this.scale) * (1 - factor);
        this.scale *= factor;
        this.update();
    }
    update() {
        this.element.style.transform = `matrix(${this.scale}, 0, 0, ${this.scale}, ${this.pos.x}, ${this.pos.y})`;
    }
}

class AbsoluteElementBase {
    constructor() {
        this.element = document.createElement('div');
        document.body.addEventListener('mousedown', (evt) => {
            this.close();
        })
        this.element.addEventListener('mousedown', (evt) => {
            evt.stopPropagation();
        })
    }

    showIn(editor, origin) {
        const eRect = editor.getBoundingClientRect();
        origin ??= { x: editor.mouse.x - eRect.left, y: editor.mouse.y - eRect.y };

        this.append(editor);
        this.element.style.left = `${origin.x}px`;
        this.element.style.top = `${origin.y}px`;
        let rect = this.element.getBoundingClientRect();
        if (rect.right >= window.innerWidth) origin.x += window.innerWidth - rect.right;
        if (rect.bottom >= window.innerHeight) origin.y += window.innerHeight - rect.bottom;
        this.element.style.left = `${origin.x}px`;
        this.element.style.top = `${origin.y}px`;
    }
    append(container) {
        container.appendChild(this.element);
    }
    remove() {
        this.element.remove();
    }
    close() {
        this.remove();
    }
}
class DropdownList extends AbsoluteElementBase {
    constructor(content, callback, extended = true) {
        super();
        this.callback = callback;
        this.element.className = 'contextMenu dropdownList';
        this.content = content;
        this.searchBar = document.createElement(`div`);
        this.searchBar.className = 'dropdownListSearchBar';
        const icon = document.createElement(`span`);
        icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path style="fill: white;" d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z"/></svg>`
        const input = document.createElement(`input`);
        input.addEventListener(`input`, () => this.filter())
        this.input = input;
        this.searchBar.appendChild(icon);
        this.searchBar.appendChild(input);
        this.container = document.createElement(`div`);
        this.element.appendChild(this.container);
        this.element.addEventListener('wheel', (evt) => {
            evt.stopPropagation();
        })
        this.filter();
        if (extended) {
            this.element.appendChild(this.searchBar);
            this.element.classList.add(`dropdownListExtended`)
        };
    }
    filter() {
        Array.from(this.container.children).forEach(c => {
            if (c.classList.contains('dropdownListEntry')) c.remove();
        })
        let filterString = this.input.value;
        for (let element of this.content) {

            if (filterString && !element.label.startsWith(filterString)) continue;
            const entry = listEntry(element, this.mapper);
            entry.className = 'dropdownListEntry';
            element = entry.elementData;
            if (element.selected) entry.classList.add('dropdownListEntrySelected')

            entry.addEventListener(`click`, (evt) => {

                this.callback?.(element.id);
                this.close();
                evt.stopPropagation()

            })
            this.container.appendChild(entry);
        }
    }
}
function selectById(content, id) {
    let result = content.find(c => c === id || c?.id === id);
    return typeof result === 'string' ? { id: result, label: result } : result;
}

function applyAttribute(HTMLstring, attribute, value) {
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = HTMLstring;
    const element = tempContainer.firstChild;
    element.setAttribute(attribute, value);
    return tempContainer.innerHTML;
}
function listEntry(element, mapper) {
    const entry = document.createElement('div');
    entry.className = `listEntry`;
    if (mapper) element = mapper(element);
    if (typeof element === 'string') element = { label: element, id: element };
    if (element.svg) {
        entry.innerHTML = `<svg class="listEntrySVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">${element.svg}</svg>`
    }
    const span = document.createElement('span');
    span.className = `contextMenuText`;
    span.innerHTML = element.label;
    entry.appendChild(span);
    if (element.reverse) Array.from(entry.children).reverse().forEach(c => entry.appendChild(c));
    entry.elementData = element;
    return entry;
}
function namedSetting(label, field) {
    const element = document.createElement('div');
    element.className = 'settingContainer';
    const labelE = document.createElement('span');
    labelE.innerHTML = label;
    element.append(labelE, field);
    element.label = labelE;
    return element;
}
function dropdownBox(content, defaultValue, extended = false) {
    const element = document.createElement('div');
    element.className = `dropdownBox`;
    element.showExtended = extended;
    let link = typeof content === 'function' ? content : () => content;

    const select = (id) => {
        let selected = selectById(link(), id);
        element.value = selected;
        element.innerHTML = '';
        const entry = listEntry(selected);
        entry.className = 'dropdownBoxListEntry';
        element.appendChild(entry);
        element.dispatchEvent(new Event('change'));
    }
    element.addEventListener('click', (evt) => {
        let dropdown = new DropdownList(link(), select, element.showExtended)
        dropdown.showIn(element, { x: 0, y: 0 });
    })
    select(defaultValue);
    element.dropdownSelect = select;
    return element;
}
class EmbeddedDropdownList extends DropdownList {
    constructor(content, callback) {
        super(content, callback);
        this.element.classList.add('embeddedDropdownList');
    }
    update(content) {
        this.content = content;
        this.filter();
    }
    close() {

    }
}
class ContextMenu extends AbsoluteElementBase {
    constructor(content) {
        super();
        this.element.className = 'contextMenu';
        this.content = [];
        this.childs = [];
        for (let i = 0; i < content.length; i++) {
            const element = content[i];
            const entry = document.createElement('div');
            entry.className = 'contextMenuEntry contextMenuInteractable';

            const span = document.createElement('span');
            span.className = `contextMenuText`;
            span.innerHTML = element.text ?? '';
            entry.appendChild(span);
            if (element.type === 'submenu') {
                entry.className = 'contextMenuEntry contextMenuInteractable contextMenuEntryExpanded'
                const triangle = document.createElement('span');
                triangle.innerHTML = '▶';
                triangle.className = 'contextMenuText'
                triangle.style.marginLeft = 'auto';
                triangle.style.marginRight = '3px';
                entry.appendChild(triangle)
                const submenu = new ContextMenu(element.content);
                submenu.parent = this;
                this.childs.push(submenu);
                submenu.element.style.left = '100%'
                entry.addEventListener('mouseenter', (evt) => {
                    submenu.append(entry);
                })
                entry.addEventListener('mouseleave', (evt) => {
                    submenu.remove();
                })
            } else if (element.type === 'button') {
                entry.addEventListener('click', (evt) => {
                    element.action?.();
                    this.close();
                })
            } else if (element.type === 'break') {
                span.remove();
                entry.className = 'contextMenuBreak';
            } else if (element.type === 'label') {
                if (i === 0) this.element.style.paddingTop = 0;
                span.className = 'contextMenuLabel';
                entry.className = 'contextMenuEntry';
            }
            this.element.appendChild(entry);
        }
        this.element.addEventListener('mouseleave', (evt) => {
            this.close();
        })
    }

    close() {
        if (this.parent) {
            this.parent.close();
        } else {
            this.childs.forEach((c) => {
                c.parent = null;
                c.close();
            });
            this.remove();
        }
    }
}
function createToolbarComponent(type, menu) {
    const element = document.createElement('div');
    element.className = 'toolbarComponent';
    element.addEventListener('click', (evt) => {
        menu.append(element);
    })
}


class ToolbarComponent {
    constructor(options) {
        this.element = document.createElement('div');
        Object.entries(options).forEach(([key, value]) => this[key](value));
    }
    title(content) {
        this.element.innerHTML = content;
    }
    image(src) {
        const img = document.createElement('img');
        img.className = `inlineImg`;
        img.src = src;
        img.alt = `Inline image`;
        this.element.prepend(img);
    }
    style(className) {
        this.element.className = className;
    }
    appendTo(container) {
        container.appendChild(this.element);
    }
}



function editorSidebar() {
    const container = document.createElement('div');
    container.className = 'editorSidebarContainer';
    const element = document.createElement('div');
    element.className = 'editorSidebar';

    const marker = document.createElement('span');
    marker.className = 'editorSidebarMarker';
    container.toggleSidebar = () => {
        let isVisible = element.style.display !== `none`;
        marker.innerHTML = isVisible ? `<` : `>`;
        element.style.display = isVisible ? `none` : ``;
    }
    marker.addEventListener('click', container.toggleSidebar);
    container.toggleSidebar();
    container.appendChild(marker);
    container.appendChild(element);
    container.element = element;
    return container;
}

//MAIN CONTENT
export { NodeEditor, NodeRegistry, numberInputField }