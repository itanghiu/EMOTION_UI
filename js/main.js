

$(function () { // a short-hand for: $(document).ready(function() { ... });
    // ensure that the function is called once all the DOM elements
    // of the page are ready to be used.

    // horizontal display
    function horizontal_view() {
           // V line
           str = "<tr>"
         for (i = 0; i < data.SENTENCES.length; i++) {
            V = data.V[i]
            color_v = constants.COLOR_VAD[V]
            var v_tag = '<td style=background-color:' + color_v + ';">1</td>'
            + v_tag
         }
         str = str + "</tr>"
         $("#horizontal_view").append(str);
     }

    // vertical display
    function vertical_view() {
        for (i = 0; i < data.SENTENCES.length; i++) {
            sentence = data.SENTENCES[i]
            emotion = data.EMOTIONS[i]
            emotion_string = constants.EMOTION_DICT2[emotion]
            V = data.V[i]
            A =  data.A[i]
            D =  data.D[i]
            var emotion_image_tag = '<img src="' + constants.IMAGE_DIR + '/' + emotion_string + '.png" width="15" height="15">'
             color_v = constants.COLOR_VAD[V]
            color_a = constants.COLOR_VAD[A]
            color_d = constants.COLOR_VAD[D]
            var v_tag = '<td style=background-color:' + color_v + ';">1</td>'
            var a_tag = '<td style=background-color:' + color_a + ';" 1>1</td>'
            var d_tag = '<td style=background-color:' + color_d + ';" 1>1</td>'

            str = "<tr>"
            + "<td>" + emotion_image_tag + "</td>"
            + v_tag
            + a_tag
            + d_tag
             + "<td>" + sentence + "</td>"
            + "</tr>"
            $("#vertical_view").append(str);
        }
    }

    horizontal_view();
    vertical_view();

});