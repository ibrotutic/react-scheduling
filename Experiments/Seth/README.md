Execute the following command in your terminal to clone the project into your local system:

git clone https://git.linux.iastate.edu/tghosh/petclinic-mysql/ 

In order to run project you must:
    
    -start a database server using XAMPP or WAMPserver
    
    -create a database schema (named petclinic) in MySQL Workbench and connect it to your database server
    
    -import the cloned project into your IDE
    
    -build the project using maven, and run as a springboot app
    
    -copy the contents of the SQL files into a MySQL workbench query and run them (first schema.SQL and then data.SQL)
    
    -type "localhost:8080/owners" into browser to see the table within the database you just created
