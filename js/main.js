

$(function () { // a short-hand for: $(document).ready(function() { ... });
    // ensure that the function is called once all the DOM elements
    // of the page are ready to be used.

    function horizontal_vad(_axis) {

           str = "<tr>"
         for (i = 0; i < data.SENTENCES.length; i++) {
            map = {'V':data.V[i], 'A':data.A[i], 'D':data.D[i] }
            axis = map[_axis]
            color_v = constants.COLOR_VAD[axis]
            color_v = Utils.updateColor(color_v.substring(1))
            var v_tag = '<td style="background-color:' + color_v + ';color:' + color_v + '";>11</td>'
            str = str + v_tag
         }
         str = str + "</tr>"
         return str
    }

    // horizontal display
    function horizontal_view() {

        var topTable = $("#top_table")
        topTable.empty(); // to remove any previous column selection

           // V line
         str =  horizontal_vad('V')
         topTable.append(str);

           // A line
         str =  horizontal_vad('A')
         topTable.append(str);

         // D line
         str =  horizontal_vad('D')
         topTable.append(str);

         // Emotions
         str = "<tr>"
         for (i = 0; i < data.SENTENCES.length; i++) {
            emotion = data.EMOTIONS[i]
            emotion_string = constants.EMOTION_DICT2[emotion]
            var emotion_image_tag = '<img src="' + constants.IMAGE_DIR + '/' + emotion_string + '.png" width="15" height="15">'
            str += '<td style="background-color:#FFFFFF;">' + emotion_image_tag + "</td>"
            //var emotion_image_tag = constants.IMAGE_DIR + '/' + emotion_string
            //str += '<td style="background: url(' + emotion_image_tag + ') left center no-repeat;background-color:#FFFFFF;"/>'
         }
         str += "</tr>"
         topTable.append(str);
     }

    // vertical display
    function vertical_view(sentenceIndex) {

        var bottomTable = $("#bottom_table")
        bottomTable.empty();
        for (i = 0; i < data.SENTENCES.length; i++) {
            sentence = data.SENTENCES[i]
            emotion = data.EMOTIONS[i]
            emotion_string = constants.EMOTION_DICT2[emotion]
            V = data.V[i]
            A =  data.A[i]
            D =  data.D[i]
            var emotionImageTag = '<img src="' + constants.IMAGE_DIR + '/' + emotion_string + '.png" width="15" height="15">'
            colorV = constants.COLOR_VAD[V]
            colorA = constants.COLOR_VAD[A]
            colorD = constants.COLOR_VAD[D]
            colorV = Utils.updateColor(colorV.substring(1))
            colorA = Utils.updateColor(colorA.substring(1))
            colorD = Utils.updateColor(colorD.substring(1))

            var vTag = '<td style="background-color:' + colorV + ';color:'+ colorV + ';">11</td>'
            var aTag = '<td style="background-color:' + colorA + ';color:'+ colorA + ';">11</td>'
            var dTag = '<td style="background-color:' + colorD + ';color:'+ colorD + ';">11</td>'

            str = '<tr>'
            if ( (sentenceIndex !== null) && (sentenceIndex === i)) {
                str = '<tr style="background-color:#ffc107;">'
            }
            str += '<td style="background-color:#FFFFFF;">' + emotionImageTag + "</td>"
            + vTag
            + aTag
            + dTag
             + '<td id="row_' + i + '">' + sentence + "</td>"
            + "</tr>"
            bottomTable.append(str);
        }
    }

    horizontal_view();
    vertical_view();

    $("#top_table tr:has(td)").mouseover(function(e) {
         $(this).css("cursor", "pointer");
    });

    /*  when a column is clicked in the horizontal panel :
          - the vertical table is scrolled until the corresponding sentence is visible
    */
     $("#top_table tr:has(td)").click(clickOnUpperTable);

    function clickOnUpperTable(e) {
         horizontal_view(); // to remove any previous column selection
         $("#top_table tr:has(td)").click(clickOnUpperTable);

         $("#top_table td").removeClass("selected");
         var clickedCell= $(e.target).closest("td");
         //clickedCell.addClass("selected");
         //clickedCell.attr("highlight");

         var cell_index = e.target.cellIndex
         vertical_view(cell_index);

         $("td, th").filter(":nth-child(" + (cell_index + 1) + ")")
         .css("background-color", "#ffc107")
         .css("color", "#ffc107")
         //.addClass("selected");

         var rowId = '#row_' + cell_index;
         var container = $('div');
         var scrollTo = $(rowId);
         container.animate({
            scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
         });
    }

});