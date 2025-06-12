// ################################################################
// MarkDown   -> HTML                                             #
// ################################################################
const CONFIG_MYMARKDOWN_FEATURES_ACTIVE = {
    'new Line': true,
    'multi Space': true,
}

const CONFIG_MYMARKDOWN_PATTERN3_ACTIVE = {
    'Link': true,

}


function MyMarkDowntoHTML(markupText) {
    assert(typOf(markupText) == 'str')

    htmlText = _MyMarkDown_FeaturesWithoutBrackets_Apply(markupText)
    htmlText = _MyMarkDown_Patterns3_Apply(htmlText, ["[", "::", "]"])
    htmlText = _MyMarkDown_Patterns2_Apply(htmlText, ["[", "]"])

    return htmlText;
}

function _MyMarkDown_FeaturesWithoutBrackets_Apply(text) {
    // new line
    text = text.replace(new RegExp('\n', "g") , '<br>')
    // multi space
    text = text.replace(/ {2,}/g, function(match) {return '&nbsp;'.repeat(match.length);})

    return text
}

function _MyMarkDown_Patterns2_Apply(text, patterns2) {

    let patsIndex = PatternsInText(text, patterns2)
    for (let i = patsIndex.length - 1; i >= 0; i--) {
        let pat = patsIndex[i];
        let part = text.substring(pat.start + patterns2[0].length, pat.end);

        if (part == ' ') {
            html = '<input type="checkbox">'
            text = text.slice(0, pat.start) + html + text.slice(pat.end + 1);}
        if (part == 'x') {
            html = '<input type="checkbox" checked="">'
            text = text.slice(0, pat.start) + html + text.slice(pat.end + 1);}
        if (part.endsWiths(['.png', '.PNG', '.jpg', '.JPG'])) {
            let size = ''; let w = ''; let h = ''
            if (part.startsWith('(') && part.includes(')')) {
                size = part.between("(", ")")
                w = size.until('x'); h = size.after('x')
                part = part.after(')')}
            html = '<img src="' + part + '" width="' + w + '" height="'+ h +'">'
            text = text.slice(0, pat.start) + html + text.slice(pat.end + 1);}
        }

    return text
}

function _MyMarkDown_Patterns3_Apply(text, patterns3) {
    let Features = CONFIG_MYMARKDOWN_PATTERN3_ACTIVE
    let part1 = ''; let part2 = ''; let html = ''
    if (Features['Link']) {
        let patsIndex = PatternsInText(text, patterns3)
        for (let i = patsIndex.length - 1; i >= 0; i--) {
            let pat = patsIndex[i];
            part1 = text.substring(pat.start + patterns3[0].length, pat.middle).trim();
            part2 = text.substring(pat.middle + patterns3[1].length, pat.end).trim();
            html = '<a href="' + part2 + '" target="#">' + part1 + '</a>';
            text = text.slice(0, pat.start) + html + text.slice(pat.end + 1);
        }}

    return text
}

function PatternsInText(text, patternL) {
    assert(typOf(text) == "str")
    assert(typOf(patternL) == "list")

    // paternL = ["[", "]"];
    if (patternL.length == 2) {
        return _PatternsFound2(text, patternL)
    }
    // paternL = ["[", ":", "]"];
    if (patternL.length == 3) {
        return _PatternsFound3(text, patternL)
    }
}

function _PatternsFound2(text, patternL) {
    let ret = []; let tmp = ""
    let startIndex = 0; 

    while (startIndex < text.length) {
        let pIndex = {"start": -1, "end": -1}
        // find index 0
        pIndex.start = text.indexOf(patternL[0], startIndex)
        if (pIndex.start == -1) return ret
        // find index 1
        pIndex.end = text.indexOf(patternL[1], pIndex.start)
        if (pIndex.end == -1) return ret
        // Extract Pattern and Push
        ret.push(pIndex)

        startIndex = pIndex.end + 1;
    }
    return ret
}

function _PatternsFound3(text, patternL) {
    let ret = []; let tmp = ""
    let startIndex = 0; 
    
    while (startIndex < text.length) {
        let pIndex = {"start": -1, "middle": -1, "end": -1}
        // find index 0
        pIndex.start = text.indexOf(patternL[0], startIndex);
        if (pIndex.start == -1) break
        // find middle index
        pIndex.middle = text.indexOf(patternL[1], pIndex.start + patternL[0].length);
        if (pIndex.middle == -1)  break
        // find end index
        pIndex.end = text.indexOf(patternL[2], pIndex.middle + patternL[1].length);
        if (pIndex.end == -1)  break
        // skip if middle comes after end
        if (pIndex.middle > pIndex.end) {
            startIndex = pIndex.start + 1;
            continue;
        }
        // Extract Pattern and Push
        ret.push(pIndex);

        startIndex = pIndex.end + patternL[2].length;
    }
    return ret;
}

// ################################################################
// HTML    -> MarkDown                                            #
// ################################################################


function HTMLtoMyMarkdown(htmlText) {
    assert(typOf(htmlText) == 'str')

    markupText = _BackToMyMarkDown_FeaturesWithoutBrackets_Apply(htmlText)

    markupText = _BackToMyMarkDown_Patterns2_Apply(markupText)

    markupText = _BackToMyMarkDown_Patterns3_Apply(markupText)

    return markupText;
    }

function _BackToMyMarkDown_FeaturesWithoutBrackets_Apply(text) {
    let Features = CONFIG_MYMARKDOWN_FEATURES_ACTIVE

    if (Features['new Line']) {
        text = text.replace(new RegExp('<br>', "g") , '\n')}
    if (Features['multi Space']) {
        text = text.replace(/&nbsp;+/g, function(match) {return ' '.repeat(match.length / 6); });}// 6 is the length of '&nbsp;'

    return text
}

function _BackToMyMarkDown_Patterns2_Apply(text) {

    if (true) {
        text = text.replace(/<input type="checkbox">/g, '[ ]')
        text = text.replace(/<input type="checkbox" checked="">/g, '[x]')}
    if (true) {
        text = _replace_SVG_BACK_To_MyMarkdon(text)}
    if (true) {
        let imgTags = PatternsInText(text, ['<img', '>'])
        for (let imgTag of imgTags) {
            let part = '<img' + text.substring(imgTag.start + '<img'.length, imgTag.end - 1) + '">';
            let w = part.between('width="', '"')
            let h = part.between('height="', '"')
            let src = part.between('src="', '"')
            let wh = wenn(w.length + h.length >0, '(' + w + 'x' + h + ')', '')
            let mark = '[' + wh + src + ']'
            text = text.replace(part, mark)
            }
        }
    return text
}

function _BackToMyMarkDown_Patterns3_Apply(text) {
    let Features = CONFIG_MYMARKDOWN_PATTERN3_ACTIVE
    let part1 = ''; let part2 = ''
    if (Features['Link']) {
        text = text.replace('target="#"', '')
        var anchorRegex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1[^>]*?>(.*?)<\/a>/g;
        var text = text.replace(anchorRegex, '[$3::$2]');}

    return text
}

function _replace_SVG_BACK_To_MyMarkdon(htmlText) {
    let ret = htmlText
    let svgs = DOMElementsFromString(htmlText, 'svg')
    for (let svg of svgs) {
        ret = ret.replace(svg.outerHTML, 'xxy-' + svg.id + '-yxx')
        for (let rpl of CONFIG_SVG_FOR_MARKDOWN_REPLACE) {
            ret = ret.replace('xxy-' + rpl[2] + '-yxx', rpl[0])}
        }
    
    return ret
    }

function DOMElementsFromString(htmlString, tag) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const svgElements = doc.querySelectorAll(tag);
    return Array.from(svgElements);
}