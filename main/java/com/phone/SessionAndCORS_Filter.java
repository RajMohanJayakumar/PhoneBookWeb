package com.phone;

import java.io.IOException;
import java.util.HashMap;
import java.util.TreeSet;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
public class SessionAndCORS_Filter implements Filter {

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		
		HttpServletRequest req = (HttpServletRequest)request;
		
		//Checking whether the session is available or not
		HttpSession session = req.getSession(false);
		if(session == null) {
			session = req.getSession();
			session.setAttribute("nameUuid", new HashMap<String,String>());
			session.setAttribute("emailUuid", new HashMap<String,String>());
			session.setAttribute("uuidData", new HashMap<String,Contact>());
			session.setAttribute("mOrdered", new TreeSet<String>());
			
			//Handling CORS exceptions
			((HttpServletResponse) response).addHeader("Access-Control-Allow-Origin", "*");
			((HttpServletResponse) response).addHeader("Access-Control-Allow-Methods","GET, OPTIONS, DELETE, HEAD, PUT, POST");
		}
		chain.doFilter(request, response);
	}
    public SessionAndCORS_Filter() {  }

	public void destroy() {  }

	public void init(FilterConfig fConfig) throws ServletException {  }
}
