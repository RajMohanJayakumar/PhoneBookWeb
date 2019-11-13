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
	
    //Creating HashMap for Name-UUID record
    HashMap<String, String> mName_UUID = new HashMap<>();

    //Creating HashMap for Email-UUID record
    HashMap<String, String> mEmail_UUID = new HashMap<>();
 
    //Creating HashMap for UUID-ContactData record
    HashMap<String, Contact> mUUID_Data = new HashMap<>();

    //Creating TreeSet for name record to get 'sorted name list' while iterating
    TreeSet<String> mOrdered = new TreeSet<>();
    
    //Creating Contact Variable
    Contact contactData;

    //Creating common Class variables to use inside the local methods
    String mName, mPhone, mEmail, mUuid, mTemp;

    //Global counter used by different methods to provide series of numbers to the show method
    int mCount = 1;
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		response.addHeader("Access-Control-Allow-Origin", "*");
		String str = jsonToString(request);
		contactData = jsonPharse(str);
        addContact(contactData);
        System.out.println("Contact Added");
	}
	
	@SuppressWarnings("deprecation")
	protected void doPut(HttpServletRequest request,HttpServletResponse response) throws IOException, ServletException {
		
//		response.addHeader("Access-Control-Allow-Origin", "*");
//		response.addHeader("Access-Control-Allow-Methods", "'GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'");
		mTemp = (String)request.getParameter("email");
		delete(response,mTemp);
		mTemp = (String)request.getParameter("data");
		contactData = jsonPharse(mTemp);
		addContact(contactData);
		System.out.println("Contact Updated");
		
     }
	
	protected void doGet(HttpServletRequest request,HttpServletResponse response) throws IOException {
//		String email = request.getParameter("email");
//		contactData = mUUID_Data.get(mEmail_UUID.get(mTemp));
//		for(String s:mOrdered) {
//			System.out.println(s);
//		}
		ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
		if(request.getParameter("todo").equals("getOne")) {
			
			response.addHeader("Access-Control-Allow-Origin", "*");
			mTemp = request.getParameter("email");
			
			String json = ow.writeValueAsString(mUUID_Data.get(mEmail_UUID.get(mTemp)));
			response.setContentType("application/json");
			response.getWriter().print(json);
			System.out.println("getOne Successful");
		}
		
		else if(request.getParameter("todo").equals("getAll")){
			response.addHeader("Access-Control-Allow-Origin", "*");
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
//		
	}
	
	@SuppressWarnings("deprecation")
	protected void doDelete(HttpServletRequest request,HttpServletResponse response) throws IOException {

//		response.addHeader("Access-Control-Allow-Origin", "*");
//		response.addHeader("Access-Control-Allow-Methods", "'GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'");
		mTemp = request.getParameter("email");
		delete(response,mTemp);
		System.out.println("Contact Deleted");
		
	}
	
	public void delete(HttpServletResponse response, String email) {
//		response.addHeader("Access-Control-Allow-Origin", "*");
//		response.setHeader("Access-Control-Allow-Methods", "DELETE");
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

//            response.addHeader("Access-Control-Allow-Origin", "*");
//            response.setHeader("Access-Control-Allow-Methods", "DELETE");
            response.setStatus(200);
        } else {
//        	response.addHeader("Access-Control-Allow-Origin", "*");
//        	response.setHeader("Access-Control-Allow-Methods", "DELETE");
            response.setStatus(404);
        }
	}
	
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
	
	public String jsonToString(HttpServletRequest request) throws IOException {
		String line = "";
		StringBuffer str = new StringBuffer();
		BufferedReader reader = request.getReader();
		while((line = reader.readLine()) != null)
			{
			str.append(line);
			}
		String jsonString = str.toString();
		System.out.println(jsonString);
		return jsonString;
	}
	
	public Contact jsonPharse(String str) throws IOException {
		
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