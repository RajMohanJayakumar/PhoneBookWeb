package com.phone;
import org.codehaus.jackson.*;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.ObjectWriter;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.TreeSet;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class Manipulate extends HttpServlet{
	
	HashMap<String, String> mName_UUID;
	HashMap<String, String> mEmail_UUID;
	HashMap<String, Contact> mUUID_Data;
	TreeSet<String> mOrdered;
	
	//Assigning respective objects
	public void assignObjects(HttpServletRequest request) {
	HttpSession session = request.getSession();
	
    //Assigning HashMap for Name-UUID record
    mName_UUID = (HashMap)session.getAttribute("nameUuid");

    //Assigning HashMap for Email-UUID record
    mEmail_UUID = (HashMap)session.getAttribute("emailUuid");
 
    //Assigning HashMap for UUID-ContactData record
    mUUID_Data = (HashMap)session.getAttribute("uuidData");

    //Assigning TreeSet for name record to get 'sorted name list' while iterating
    mOrdered = (TreeSet)session.getAttribute("mOrdered");
    
	}
    
    //Creating Contact Variable
    Contact contactData;

    //Creating common Class variables to use inside the local methods
    String mName, mPhone, mEmail, mUuid, mTemp;

    //Global counter used by different methods to provide series of numbers to the show method
    int mCount = 1;
	
    //Getting values from the request and storing it to the hashmap
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		assignObjects(request);
		String str = jsonToString(request);
		contactData = jsonPharse(str);
		System.out.println(contactData.getEmail());
		if(!contactData.getEmail().equals("") && !contactData.getName().equals("") && !contactData.getPhoneNumber().equals(""))
		{        addContact(contactData);
        System.out.println("Contact Added");}
	}
	
	//Getting values from the request and updating the existing record
	@SuppressWarnings("deprecation")
	protected void doPut(HttpServletRequest request,HttpServletResponse response) throws IOException, ServletException {
		
		assignObjects(request);
		mTemp = (String)request.getParameter("email");
		delete(response,mTemp);
		mTemp = (String)request.getParameter("data");
		contactData = jsonPharse(mTemp);
		addContact(contactData);
		System.out.println("Contact Updated");
		
     }
	
	//sending values to the front end as a response
	protected void doGet(HttpServletRequest request,HttpServletResponse response) throws IOException {

		assignObjects(request);
		ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
		if(request.getParameter("todo").equals("getOne")) {
			
			mTemp = request.getParameter("email");
			
			String json = ow.writeValueAsString(mUUID_Data.get(mEmail_UUID.get(mTemp)));
			response.setContentType("application/json");
			response.getWriter().print(json);
			System.out.println("getOne Successful");
		}
		
		else if(request.getParameter("todo").equals("getAll")){
			List<Contact> list = new ArrayList<Contact>();
			for(String s:mOrdered) {
				Contact json = mUUID_Data.get(mName_UUID.get(s));
				list.add(json);
			}
			String str = ow.writeValueAsString(list);
			response.setContentType("application/json");
			response.getWriter().print(str);
			System.out.println("ShowAll Successful");
		}
	}
	
	//Getting a value(email) from the front-end and deleting the respective record
	@SuppressWarnings("deprecation")
	protected void doDelete(HttpServletRequest request,HttpServletResponse response) throws IOException {

		assignObjects(request);
		mTemp = request.getParameter("email");
		delete(response,mTemp);
		System.out.println("Contact Deleted");
		
	}
	
	//Getting the reference email for the record and deleting across the hashmaps
	public void delete(HttpServletResponse response, String email) {
		if (mEmail_UUID.containsKey(email)) {

            //Fetching Details from Contact record
            contactData = mUUID_Data.get(mEmail_UUID.get(email));

            //Removing the record from Name-UUID HashMap
            mName_UUID.remove(contactData.getName());
            
            //Removing the record from UUID-Data HashMap
            mUUID_Data.remove(mEmail_UUID.get(contactData.getEmail()));

            //Removing the record from Email-UUID HashMap
            mEmail_UUID.remove(contactData.getEmail());

            //Removing name from Name TreeSet
            mOrdered.remove(contactData.getName());

            response.setStatus(200);
        } else {
            response.setStatus(404);
        }
	}
	
	//method to add a contact with the values passed as arguments
	public void addContact(Contact contactData) {
		
		//Generating random UUID
        mUuid = UUID.randomUUID().toString();

        //Updating Name-UUID HashMap
        mName_UUID.put(contactData.getName(), mUuid);

        //Updating Email-UUID HashMap
        mEmail_UUID.put(contactData.getEmail(), mUuid);

        //Updating UUID-Contact HashMap
        mUUID_Data.put(mUuid, contactData);

        //Updating Name to TreeSet to Maintain Alphabetical Order
        mOrdered.add(contactData.getName());
	}
	
	//Fetching JSON standard from the request and passing as a string
	public String jsonToString(HttpServletRequest request) throws IOException {
		String line = "";
		StringBuffer str = new StringBuffer();
		BufferedReader reader = request.getReader();
		while((line = reader.readLine()) != null)
			{
			str.append(line);
			}
		String jsonString = str.toString();
		return jsonString;
	}
	
	//Pharsing a json standard string format to an Object(Contact)
	public Contact jsonPharse(String str) throws IOException {
		
		//Creating reference to store the contact variable
		Contact contact = null;
		
	      ObjectMapper mapper = new ObjectMapper();
	      
	      try
	      {
	         contact =  mapper.readValue(str.getBytes(),Contact.class);
	      } catch (JsonGenerationException e)
	      {
	         e.printStackTrace();
	      } catch (JsonMappingException e)
	      {
	         e.printStackTrace(); 
	      } catch (IOException e)
	      {
	         e.printStackTrace();
	      }
	      return contact;
	}
	}