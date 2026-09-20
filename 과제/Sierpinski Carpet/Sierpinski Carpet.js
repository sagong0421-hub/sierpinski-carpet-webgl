"use strict";

var canvas;
var gl;

var points = [];

var numTimesToSubdivide = 0;

// 초기 색상은 빨간색으로 설정
var currentColor = [ 1.0, 0.0, 0.0, 1.0 ];

function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  도형의 초기 좌표 설정
    //

    // 정사각형의 네 꼭짓점을 지정한다.

    var vertices = [
        vec2( -1, 1 ),
        vec2( -1,  -1 ),
        vec2(  1, -1 ), 
        vec2(  1, 1 )
    ];
    divideSquare( vertices[0], vertices[1], vertices[2], vertices[3],
                    numTimesToSubdivide);

    //
    //  화면 크기와 배경색 설정
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  셰이더를 불러와 사용할 프로그램 설정

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // 선택한 색상을 셰이더에 전달
    var colorLoc = gl.getUniformLocation(program, "uColor");
    gl.uniform4fv(colorLoc, currentColor);

    // 꼭짓점 데이터를 GPU 버퍼에 저장

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW ); // 생성된 꼭짓점 수에 맞춰 버퍼 할당
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(points));

    // 버퍼의 좌표를 셰이더의 vPosition에 연결

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    document.getElementById("slider").onchange = function(event) {
        numTimesToSubdivide = parseInt(event.target.value);
    };
    document.getElementById("colorPicker").onchange = function(event) {

        var hex = event.target.value;

        var r = parseInt(hex.substr(1, 2), 16) / 255;
        var g = parseInt(hex.substr(3, 2), 16) / 255;
        var b = parseInt(hex.substr(5, 2), 16) / 255;

        currentColor = [r, g, b, 1.0];
    };


    render();
};

// 정사각형을 삼각형 두 개로 나누어 그린다.

function square( a, b, c , d )
{
    points.push( a, b, c );
    points.push( a, c, d );
}

function divideSquare( a, b, c, d, count )
{

    // 분할 횟수가 0이면 재귀 종료

    if ( count === 0 ) {
        square( a, b, c, d );
    }
    else {

        // 가로와 세로 비율로 정사각형 안의 좌표를 구한다.
        function point( x, y ) {
            var bottom = mix( b, c, x );
            var top = mix( a, d, x);

            return mix( bottom, top, y );
        }

        --count;

        // 첫 번째 줄의 사각형 3개

        divideSquare( point( 0, 0 ), point( 0, 1/3 ), point ( 1/3, 1/3 ), point( 1/3, 0 ), count);
        divideSquare( point( 1/3, 0 ), point( 1/3, 1/3 ), point ( 2/3, 1/3 ), point( 2/3, 0 ), count);
        divideSquare( point( 2/3, 0 ), point( 2/3, 1/3 ), point ( 1, 1/3 ), point( 1, 0), count);

        // 가운데 칸을 뺀 두 번째 줄의 사각형 2개

        divideSquare( point( 0, 1/3 ), point( 0, 2/3 ), point ( 1/3, 2/3 ), point( 1/3, 1/3 ), count);
        divideSquare( point( 2/3, 1/3 ), point( 2/3, 2/3 ), point ( 1, 2/3 ), point( 1, 1/3 ), count);

        // 세 번째 줄의 사각형 3개

        divideSquare( point( 0, 2/3 ), point( 0, 1 ), point ( 1/3, 1 ), point( 1/3, 2/3 ), count);
        divideSquare( point( 1/3, 2/3 ), point( 1/3, 1 ), point ( 2/3, 1 ), point( 2/3, 2/3 ), count);
        divideSquare( point( 2/3, 2/3 ), point( 2/3, 1 ), point ( 1, 1 ), point( 1, 2/3 ), count);
    }
}

window.onload = init;

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, points.length );
    points = [];
    requestAnimFrame(init);
}
