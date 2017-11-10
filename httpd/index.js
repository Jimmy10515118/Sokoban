1. 'use strict';
2.
3. let http = require('http');
4.
5. const routingTable = {
6. '/': {
7. url: '../htdocs/index.html',
8. type: 'text/html'
9. },
10. '/styles.css': {
11. url: '../htdocs/assets/css/styles.css',
12. type: 'text/css'
13. },
14. '/SokobanClone_byVellidragon.png': {
15. url: '../htdocs/assets/png/SokobanClone_byVellidragon.png',
16. type: 'text/css'
17. },
18. };
19.
20. /**
21. * 利⽤http.ServerResponse 物件回傳檔案內容
22. *
23. * @name serve
24. * @function
25. * @param response - http.ServerResponse 物件
26. * @param fname - 要回傳的檔案名
27. * @param datatype - 回傳檔案內容的Mine-Type
28. * @returns {undefined}
29. */
30. let serve = (response, fname, datatype) => {
31. let fs = require('fs');
32.
33. fs.readFile(fname, (err, data) => {
34. if (err) {
35. console.log(' 檔案讀取錯誤');
36. }
37. else {
38. response.writeHead(200, {
39. 'Content-Type': datatype
40. });
14
41.
42. response.write(data);
43. response.end();
44. }
45. });
46. };
47.
48. http.createServer((request, response) => {
49. let fs = require('fs');
50.
51. let postData = '';
52.
53. // 利⽤'data' event 消耗掉data chunk;
54. // 'end' event 才會被fired
55. request.on('data', (chunk) => {
56. postData += chunk;
57.
58. console.log(
59. ' 接收的POST data ⽚段k: [' + chunk + '].'
60. );
61. });
62.
63. request.on('end', () => {
64. if (request.url in routingTable) {
65. let obj = routingTable[request.url];
66.
67. serve(response, obj.url, obj.type);
68. }
69. else {
70. console.log(' 未定義的存取: ' + request.url);
71.
72. response.end();
73. }
74. });
75. }).listen(8088);
76.
77. // log message to Console
78. console.log(' 伺服器啓動，連線url: http://127.0.0.1:8088/');
79.
80. // index.js
