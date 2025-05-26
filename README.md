# Reast-Spring
유용한 VScode Extensions : Better Comments, Color Highlight, Meterial Icon Them,Better Comments <br>
빌드 도구 : Gradle for java (그루비를 이용한 빌드 자동화 시스템) <br>
Spring boot용 : Spring Boot Extension Pack , Spring Boot Snippets
<hr>
ERD작성<br>
DDL(Data Definition Language):데이터 정의어<br>
DML(Data Manipulation Language):데이터 조작어<br>
DCL(Data Control Language):데이터베이스 접근,권한관련<br>
<hr>
http 인증 방식 <br>
Basic Authentication : ID/PW로 Base64로 인코딩후 Authorization 헤더에 포함하여 전송, 안전하지 않기 때문에 SSL/TLS와 함께 사용 
<br><br>
사용->Bearer Token Autentication : 헤더에 토큰 포함 전송 Authorizetion 헤더 포함하여 전송, JWT 사용, 간단/상태유지 x/확장성 Good , 토큰 노출 위험, 토큰관리힘듬 <br><br>
 JWT(JSON Web Token) : 클레임이라는 정보를 JSON형태로 안전하게 전송하기 위한 토큰<br>
 1.Header : 토큰 타입,알고리즘 정보를 담고있음 , Base64Url로 인코딩<br>
 2.Payload : 클레임정보, 대상, 발행자, 만료 시간등 다양한 정보 포함<br>
 3.Signature : Header.Payload,Secret Key 등 사용해서 만든 서명
<br><br>
OAuth : 토큰 인증,사용자가 직접 증명 x 미리 인증받아서 토큰 발급, 토큰을 이용해서 API를 요청하는 방식 OAuth 2.0 
<br><br>
API Key / Session Based Authentication