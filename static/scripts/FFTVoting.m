global N;
N = 16;

%%

global phase index votes;

phase = 0;
index = 1;
votes = struct('phase', [], 'index', []);

X = zeros(N, 1);
X(index) = 1;
Y = exp(1i * phase) * fft(X);

f = figure;
ax = axes('Parent', f, 'position', [0.13, 0.39, 0.77, 0.54]);
h = bar(real(Y));
axis([0.5, N + 0.5, -1, 1])

resultFigure = figure;
resultAx = axes('Parent', resultFigure);

b = uicontrol('Parent', f, 'Style', 'slider', 'Position', [81, 75, 419, 23], 'value', phase, 'min', -pi, 'max', pi);
bl1 = uicontrol('Parent', f, 'Style', 'text', 'Position', [50, 75, 23, 23], 'string', '-pi');
bl2 = uicontrol('Parent', f, 'Style', 'text', 'Position', [500, 75, 23, 23], 'string', 'pi');
bl3 = uicontrol('Parent', f, 'Style', 'text', 'Position', [240, 60, 100, 23], 'string', 'phase:');

bbox = uicontrol('Parent', f, 'Style', 'edit', 'Position', [310, 60, 60, 23], 'string', phase);

b.Callback = @(hObject, callbackData) phaseCallback(hObject, callbackData, h, bbox);
bbox.Callback = @(hObject, callbackData) phaseBoxCallback(hObject, callbackData, h, b);

c = uicontrol('Parent', f, 'Style', 'slider', 'Position', [81, 30, 419, 23], 'value', index, 'min', 1, 'max', N, 'SliderStep', [1/(N-1), 1/(N-1)]);
cl1 = uicontrol('Parent', f, 'Style', 'text', 'Position', [50, 30, 23, 23], 'string', '1');
cl2 = uicontrol('Parent', f, 'Style', 'text', 'Position', [500, 30, 23, 23], 'string', '16');
cl3 = uicontrol('Parent', f, 'Style', 'text', 'Position', [240, 15, 100, 23], 'string', 'index:');

cbox = uicontrol('Parent', f, 'Style', 'edit', 'Position', [310, 15, 60, 23], 'string', index);

c.Callback = @(hObject, callbackData) indexCallback(hObject, callbackData, h, cbox);
cbox.Callback = @(hObject, callbackData) indexBoxCallback(hObject, callbackData, h, c);

addBox = uicontrol('Parent', f, 'Style', 'pushbutton', 'Position', [270, 110, 60, 23], 'string', 'Add Vote');
addText = uicontrol('Parent', f, 'Style', 'text', 'Position', [300, 110, 60, 23], 'string', '#: ' + string(length(votes.index)));
addBox.Callback = @(hObject, callbackData) addCallback(hObject, callbackData, addText);

resultBox = uicontrol('Parent', f, 'Style', 'pushbutton', 'Position', [360, 110, 60, 23], 'string', 'See result');
resultBox.Callback = @(hObject, callbackData) resultCallback(hObject, callbackData, h, resultAx);

function phaseCallback(hObject, callbackData, h, bbox)
global phase;

phase = hObject.Value;
set(bbox, 'string', string(phase))
redrawPlot(h);

end

function phaseBoxCallback(hObject, callbackData, h, b)
global phase;

phase = max(-pi, min(pi, double(string(hObject.String))));
set(b, 'value', phase)
set(hObject, 'string', string(phase))
redrawPlot(h);

end

function indexCallback(hObject, callbackData, h, cbox)
global index;

index = round(hObject.Value);
set(hObject, 'Value', index);
set(cbox, 'string', string(index));
redrawPlot(h);

end

function indexBoxCallback(hObject, callbackData, h, c)
global index N;

index = round(max(1, min(N, double(string(hObject.String)))));
set(c, 'value', index);
set(hObject, 'string', string(index));
redrawPlot(h);

end

function redrawPlot(h)
global phase index N;

X = zeros(N, 1);
X(index) = 1;
set(h, 'YData', real(exp(1i * phase) * fft(X)));

end

function addCallback(hObject, callbackData, addText)
global phase index votes;

votes.phase = [votes.phase, phase];
votes.index = [votes.index, index];
set(addText, 'string', "#: " + string(length(votes.index)));

end

function resultCallback(hObject, callbackData, h, ax)
global votes N;
X = zeros(N, 1);

for ind = 1:length(votes.index)
    X(votes.index(ind)) = X(votes.index(ind)) + exp(1i * votes.phase(ind));
end

Y = real(fft(X));
maxVal = max(Y);
maxInds = maxVal == Y;
cData = h.CData;
cData(maxInds, :) = repmat([0, 0.5, 0], sum(maxInds), 1);

bar(Y, 'FaceColor', 'flat', 'CData', cData, 'Parent', ax);

end