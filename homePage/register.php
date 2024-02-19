<?php
$name=$_POST['name'];
$email=$_POST['email'];
$password=$_POST['password'];
$conn=mysqli_connect("localhost","root","Sakshi@89","signup");
// Creating a database
// if(isset($_POST["submit"])){
// $sql="CREATE Database signup";}
// if(mysqli_query($conn,$sql)){
// echo "Database created
// successfulyy....";
// }
// else{
// echo "Database creation failed....";
// }
//Creating a table
// $sql="Create table signup(name VARCHAR(30) NOT
// NULL,email VARCHAR(20) NOT NULL,password
// VARCHAR(20) NOT NULL)";
// if(mysqli_query($conn,$sql)){
// echo "Table created successfully....";
// }
// else{
// echo "Table could not be created....";
// }
// Inserting values
$sql="Insert into signup(name,email,password)
values('$name','$email','$password')";
if(mysqli_query($conn,$sql)){
echo "Thanks for filling the form....";
}
else{
echo "Record insertion failed....";
}
// Updating the values
// $sql="Update students set name='Yash'
// where id=02";
// if(mysqli_query($conn,$sql)){
// echo "Data updated....";
// }
// else{
// echo "Data updation failed....";
// }
// $sql="Select * from students";
// $retval=mysqli_query($conn, $sql);
// if(mysqli_num_rows($retval) > 0){
// while($row =
// mysqli_fetch_assoc($retval)){
// echo "ROLL NO :{$row['id']}
// <br> ".
// "NAME : {$row['name']} <br>
// ".
// "CITY : {$row['city']} <br> ".
// "--------------------------------<br>";
// } //end of while
// }
// else
// {
// echo "0 results";
// }