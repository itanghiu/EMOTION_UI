

$(function () { // a short-hand for: $(document).ready(function() { ... });
    // ensure that the function is called once all the DOM elements
    // of the page are ready to be used.

    emotion_filters = []

    function horizontal_vad(_axis) {

         str = "<tr>"
         for (i = 0; i < data.SENTENCES.length; i++) {
            map = {'V':data.V[i], 'A':data.A[i], 'D':data.D[i], 'emotion_index':data.EMOTIONS[i] }
            emotion_index = map['emotion_index']
            emotion = constants.EMOTION_IMAGE_DICT[emotion_index]
            emotion_selected = emotion_filters.includes(emotion)
            axis = map[_axis]
            color_v = constants.COLOR_VAD[axis]
            color_v = (!emotion_selected) ? Utils.convertColorToGrey(color_v.substring(1)) : color_v
            var v_tag = '<td style="background-color:' + color_v + ';color:' + color_v + '";>11</td>'
            str += v_tag
         }
         str += "</tr>"
         return str
    }

    function filter_table() {

         var filterTable = $("#filter_table")
         str = ''
         emotions = Object.keys(constants.EMOTION_DICT)
         for (row = 0; row < 3; row++) {
             //for (const [emotion, value] of Object.entries(data.EMOTION_DICT)) {
             var html = '<tr>'
             + '<td><input type="checkbox" name="emotion" value="' + emotions[3*row + 0] + '"/> <label for="emotion">' + emotions[3*row + 0] + '</label> </td>'
             + '<td><input type="checkbox" name="emotion" value="' + emotions[3*row + 1]+  '"/> <label for="emotion">' + emotions[3*row + 1] + '</label> </td>'
             + '<td><input type="checkbox" name="emotion" value="' + emotions[3*row + 2]+ '"/> <label for="emotion">' + emotions[3*row + 2] + '</label> </td>'
             + '</tr>'
             str += html
         }
         filterTable.append(str);
    }

    // horizontal display
    function horizontal_table() {

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
            emotion_index = data.EMOTIONS[i]
            emotion = constants.EMOTION_IMAGE_DICT[emotion_index]
            var emotion_image_tag = '<img src="' + constants.IMAGE_DIR + '/' + emotion + '.png" width="15" height="15">'
            str += '<td style="background-color:#FFFFFF;">' + emotion_image_tag + "</td>"
         }
         str += "</tr>"
         topTable.append(str);
     }

    // vertical display
    function vertical_table(sentenceIndex) {

        var bottomTable = $("#bottom_table")
        bottomTable.empty();
        for (i = 0; i < data.SENTENCES.length; i++) {
            sentence = data.SENTENCES[i]
            emotion = data.EMOTIONS[i]
            emotion_string = constants.EMOTION_IMAGE_DICT[emotion]
            V = data.V[i]
            A =  data.A[i]
            D =  data.D[i]
            var emotionImageTag = '<img src="' + constants.IMAGE_DIR + '/' + emotion_string + '.png" width="15" height="15">'
            colorV = constants.COLOR_VAD[V]
            colorA = constants.COLOR_VAD[A]
            colorD = constants.COLOR_VAD[D]
            colorV = Utils.convertColorToGrey(colorV.substring(1))
            colorA = Utils.convertColorToGrey(colorA.substring(1))
            colorD = Utils.convertColorToGrey(colorD.substring(1))

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

    filter_table()
    horizontal_table();
    vertical_table();

    // checkbox event listener
    $('input[type=checkbox][name=emotion]').change(function() {
            emotion = this.value
            if ($(this).is(':checked')) {
                //alert(`${this.value} is checked`);
                emotion_filters.push(emotion)
            }
            else {
                //alert(`${this.value} is unchecked`);
                emotion_filters = Utils.arrayStringRemove(emotion_filters, emotion)
            }
            horizontal_table();
            $("#top_table tr:has(td)").click(clickOnUpperTable);
            $("#top_table tr:has(td)").mouseover(mouseOverUpperTable);
    });

    $("#top_table tr:has(td)").mouseover(mouseOverUpperTable);
    $("#top_table tr:has(td)").click(clickOnUpperTable);

    function mouseOverUpperTable(e) {
        $(this).css("cursor", "pointer");
    }

    /*  when a column is clicked in the horizontal panel :
          - the vertical table is scrolled until the corresponding sentence is visible
    */
    function clickOnUpperTable(e) {
         horizontal_table();
         $("#top_table tr:has(td)").click(clickOnUpperTable);
         $("#top_table tr:has(td)").mouseover(mouseOverUpperTable);

         $("#top_table td").removeClass("selected");
         var clickedCell= $(e.target).closest("td");
         //clickedCell.addClass("selected");
         //clickedCell.attr("highlight");

         var cell_index = e.target.cellIndex
         vertical_table(cell_index);

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