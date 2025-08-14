class MyMarkDown {
    constructor() {
    }

// ################################################################
// MarkDown   -> HTML                                             #
// ################################################################

toHTML(markupText) {
    assert(typOf(markupText) == 'str')
    let htmlText = ""
    htmlText = this._MyMarkDown_FeaturesWithoutBrackets_Apply(markupText)
    htmlText = this._MyMarkDown_Patterns3_Apply(htmlText, ["[", "::", "]"])
    htmlText = this._MyMarkDown_Patterns2_Apply(htmlText, ["[", "]"])

    return htmlText;
}

 _MyMarkDown_FeaturesWithoutBrackets_Apply(text) {
    // new line
    text = text.replace(new RegExp('\n', "g") , '<br>')
    // multi space
    text = text.replace(/ {2,}/g, function(match) {return '&nbsp;'.repeat(match.length);})

    let loopCount = 0; let maxLoop = 1000

    // tables
    loopCount = 0;
    while (text.includes('#table') && text.includes('#/table')) {
        loopCount += 1; if (loopCount > maxLoop) break

        let tableContent = text.between('#table', '#/table');
        if (tableContent) {
            let htmlTable = ''
            let newLine = wenn(tableContent.includes('\n'), '\n', '<br>');
            let rows = tableContent.split(newLine)
            if (rows[0] != '' || rows[2] != '#' || rows[rows.length - 1] != '') {
                rows = []
                htmlTable = tableContent}

            if (rows.length > 0) {
                htmlTable = '<table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse;">';
                // Header row
                let headerRow = rows[1].split('#').slice(1)
                htmlTable += '<tr>' + headerRow.map(cell => `<th>${cell.trim()}</th>`).join('') + '</tr>';
                // Data rows
                for (let i = 3; i < rows.length; i++) {
                    let cells = rows[i].split('#').slice(1)
                    // let cells = rows[i].split('#').filter(cell => cell.trim());
                    htmlTable += '<tr>' + cells.map(cell => `<td>${cell.trim()}</td>`).join('') + '</tr>';
                }
                htmlTable += '</table>';}

            text = text.replace('#table' + tableContent + '#/table', htmlTable)
        }
    }

    // header
    loopCount = 0;
    while (text.includes('##')) {
        loopCount += 1; if (loopCount > maxLoop) break
        let header = text.between('##', '<br>')
        text = text.replace('##' + header, '<h2>' + header.trim() + '</h2>')}

    return text
}

_MyMarkDown_Patterns2_Apply(text, patterns2) {

    let patsIndex = this.PatternsInText(text, patterns2)
    for (let i = patsIndex.length - 1; i >= 0; i--) {
        let pat = patsIndex[i]; let html = ""
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

 _MyMarkDown_Patterns3_Apply(text, patterns3) {
    let part1 = ''; let part2 = ''; let html = ''
    if (true) {
        let patsIndex = this.PatternsInText(text, patterns3)
        for (let i = patsIndex.length - 1; i >= 0; i--) {
            let pat = patsIndex[i];
            part1 = text.substring(pat.start + patterns3[0].length, pat.middle).trim();
            part2 = text.substring(pat.middle + patterns3[1].length, pat.end).trim();
            html = '<a href="' + part2 + '" target="#">' + part1 + '</a>';
            text = text.slice(0, pat.start) + html + text.slice(pat.end + 1);
        }}

    return text
}

PatternsInText(text, patternL) {
    assert(typOf(text) == "str")
    assert(typOf(patternL) == "list")

    // paternL = ["[", "]"];
    if (patternL.length == 2) {
        return this._PatternsFound2(text, patternL)
    }
    // paternL = ["[", ":", "]"];
    if (patternL.length == 3) {
        return this._PatternsFound3(text, patternL)
    }
}

_PatternsFound2(text, patternL) {
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

_PatternsFound3(text, patternL) {
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
        pIndex.end = text.indexOf(patternL[2], pIndex.start + patternL[1].length);
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


HTMLtoMyMarkdown(htmlText) {
    assert(typOf(htmlText) == 'str')
    let markupText = ""

    markupText = this._BackToMyMarkDown_FeaturesWithoutBrackets_Apply(htmlText)

    markupText = this._BackToMyMarkDown_Patterns2_Apply(markupText)

    markupText = this._BackToMyMarkDown_Patterns3_Apply(markupText)

    return markupText;
    }

_BackToMyMarkDown_FeaturesWithoutBrackets_Apply(text) {

    if (true) {
        text = text.replace(new RegExp('<br>', "g") , '\n')}
    if (true) {
        text = text.replace(/&nbsp;+/g, function(match) {return ' '.repeat(match.length / 6); });}// 6 is the length of '&nbsp;'

    if (true) {
        let header = text.between('<h2>', '</h2>\n')
        text = text.replace('<h2>' + header + '</h2>', '## ' + header.trim())}

    if (true) {
        let maxTableLoops = 10; let idx = 0
        for (let i = 1; i <= maxTableLoops; i++) {
            idx = text.indexOf('<table', idx)
            let table = text.slice(idx).between('<table', '</table>')
            let rows0 = table.split('<tr>')
            if (rows0.length > 1) {
                let headers = new MyMarkDown_FunctionHelpers().headers(table)
                
                let data = new MyMarkDown_FunctionHelpers().data(table)

                if (headers.length > 0 && data.length > 0) {
                    let tableMarkup = new MyMarkDown_FunctionHelpers().tableMarkup(headers, data)
                    text = text.replace('<table' + table + '</table>', tableMarkup )}
            }
            idx = text.indexOf('</table') + '</table>'.length
        }

        if (true) {
            // text = text.replace(/&lt;/g, '<')
            // text = text.replace(/&gt;/g, '>')
            }
        
        return text
    }
}

_BackToMyMarkDown_Patterns2_Apply(text) {

    if (true) {
        text = text.replace(/<input type="checkbox">/g, '[ ]')
        text = text.replace(/<input type="checkbox" checked="">/g, '[x]')}

    if (true) {
        let imgTags = this.PatternsInText(text, ['<img', '>'])
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

_BackToMyMarkDown_Patterns3_Apply(text) {
    if (true) {
        text = text.replace('target="#"', '')
        var anchorRegex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1[^>]*?>(.*?)<\/a>/g;
        var text = text.replace(anchorRegex, '[$3::$2]');}

    return text
}
    
    }

    class MyMarkDown_FunctionHelpers {
        constructor() {
        }

        headers(htmlTable) {
            let rows0 = htmlTable.split('<tr>')
            let headers0 = rows0[1].split('<th>')
            let headers = [];
            for (let i = 1; i < headers0.length; i++) {
                let header = headers0[i].until('</th>').trim()
                if (header != '') headers.push(header)
            }
        return headers;
        }

        data(htmlTable) {
            let rows0 = htmlTable.split('<tr>')
            let data = [];
            for (let i = 2; i < rows0.length; i++) {
                let cells0 = rows0[i].split('<td>')
                let cells = []
                for (let j = 1; j < cells0.length; j++) {
                    let cell = cells0[j].until('</td>')
                    cells.push(cell)
                }
                if (cells.length > 0) {data.push(cells)}
            }
        return data;
        }

        tableMarkup(headers, data) {
            let tableMarkup = '#table\n#' + headers.join('#') + '\n#\n'
            for (let row of data) {
                tableMarkup  += '#' + row.join('#') + '\n'
            }
            tableMarkup  += '#/table'
            return tableMarkup;
        }
    }
