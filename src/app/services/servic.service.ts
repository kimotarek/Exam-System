import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { CommaExpr } from "@angular/compiler";
import { users } from "../objects/users";

// import {class you made}
@Injectable({
  providedIn: 'root'
})


export class ServicService {
  private apiServerUrl = 'https://brick-red-swordfish-kit.cyclic.app';
  user!: users;
  upcoming_ex!:any[];
  token_ex!:any[];
  non_token!:any[];
  ids_ex!:any[];
  constructor(private http: HttpClient) { }

  

//send user with all date ,recieve json="success=false" if the email or phone are found in system
//else i recieve json="success=true"  backend active verification code and i will send to backend the verify 
public sign_up(new_user:any):Observable<any>{
  return this.http.post<any>(`${this.apiServerUrl}/sign_up`,{email: new_user.get_email(),phone_namber: new_user.get_phone_namber()}, { withCredentials: true });
}
//send user with email and pass if the user not found recive json="success=false"else recive json="success=true ,user:user" with all data
public login(user:any):Observable<any>{
  return this.http.post<any>(`${this.apiServerUrl}/login`,user, { withCredentials: true });
}
// i will send verify code to back and if it code is wrong i will recive json="success=false ", code good but email is token {success=true created=false } redirect to sign up
// {success=true created=false } redirect to login
public verify_code(code:any):Observable<any>{
  return this.http.post<any>(`${this.apiServerUrl}/verify_code`,{code: code, user:this.user}, { withCredentials: true });
}

// send another verification code again  
public send_again():Observable<any>{
  console.log(this.user.get_phone_namber());
  
  return this.http.post<any>(`${this.apiServerUrl}/send_agin`,{phone_namber:this.user.get_phone_namber(),email:this.user.get_email()}, { withCredentials: true });
}
// i will send this request if user go to sign up and i recive pair of array ,
//one to all city ,other to all country. it can be not used and replace this request
// with arrays in frontend and this array fill with any  cities and countries  
public city_country():Observable<any>{
  return this.http.get<any>(`${this.apiServerUrl}/city_country`);
}

//it checks if the user is in sign in a system or not and authenticated to the system
public is_signin():Observable<any>{
  return this.http.get<any>(`${this.apiServerUrl}/is_signedin`, { withCredentials: true });
}

// it take url of the new photo of the user and return no thing
public change_photo(url:any):Observable<any>{
  return this.http.post<any>(`${this.apiServerUrl}/change_photo`,{url:url}, { withCredentials: true });
}

// when i enter home bar i send request and want to receive json that contains {user:user,non_taken_exam:any exam that the user does not take it yet}
public home_bar_init():Observable<any>{
  return this.http.get<any>(`${this.apiServerUrl}/home/home_bar`, { withCredentials: true });
}
// when i enter home bar i send request and want to receive json that contains {user:user,non_taken_exam:any exam that the user does not take it yet}
//he take ids of all exams in user
public exam_bar_init():Observable<any>{
  return this.http.post<any>(`${this.apiServerUrl}/home/exams`,{ids:this.ids_ex}, { withCredentials: true });
}
public exam_bar_init_admin():Observable<any>{
  return this.http.post<any>(`${this.apiServerUrl}/home/exams`,{ids:[]}, { withCredentials: true });
}

//return id of the
public add_new_exam(new_exam:any):Observable<any>{
  console.log(new_exam)
  return this.http.post<any>(`${this.apiServerUrl}/admin/add_exam`,{new_exam:new_exam}, { withCredentials: true });
}

public edit_exam(id:any,new_exam:any):Observable<any>{
  return this.http.post<any>(`${this.apiServerUrl}/admin/edit_exam`,{_id:id,new_exam:new_exam}, { withCredentials: true });
}

public remove_exam(id:any):Observable<any>{
  return this.http.post<any>(`${this.apiServerUrl}/admin/remove_exam`,{_id:id}, { withCredentials: true });
}


public add_location(new_locate:any):Observable<any>{
  console.log(new_locate)
  return this.http.post<any>(`${this.apiServerUrl}/admin/add_location`,new_locate, { withCredentials: true });
}

// sooon.....
// public edit_location(id:any,new_locate:any):Observable<any>{
//   return this.http.post<any>(`${this.apiServerUrl}/admin/add_location`,{_id:id,new_locate:new_locate}, { withCredentials: true });
// }

public remove_locate(id:any):Observable<any>{
  return this.http.post<any>(`${this.apiServerUrl}/admin/remove_location`,{_id:id}, { withCredentials: true });
}

public get_places():Observable<any>{
  return this.http.get<any>(`${this.apiServerUrl}/home/get_places`, { withCredentials: true });
}
public get_calender():Observable<any>{
  return this.http.get<any>(`${this.apiServerUrl}/home/get_all_days`, { withCredentials: true });
}

public get_calender_admin():Observable<any>{
  return this.http.get<any>(`${this.apiServerUrl}/admin/get_all_days`, { withCredentials: true });
}

public add_day(new_time:any):Observable<any>{
  return this.http.post<any>(`${this.apiServerUrl}/admin/add_time`,new_time, { withCredentials: true });
}
public remove_day(id_day:any):Observable<any>{
  return this.http.post<any>(`${this.apiServerUrl}/admin/delete_day`,{day_id:id_day}, { withCredentials: true });
}
public book_exam(merchantRefNumber:any,referenceNumber:any,signature:any):Observable<any>{
  return this.http.post<any>(`${this.apiServerUrl}/exam/book_exam`,{merchantRefNumber:merchantRefNumber,signature:signature,referenceNumber:referenceNumber}, { withCredentials: true });
}


public get_allstudent_inoneday(id_day:any):Observable<any>{
  return this.http.post<any>(`${this.apiServerUrl}/admin/get_users_with_day`,{day_id:id_day}, { withCredentials: true });
}

public change_percentage(id_user:any,id_exam:any,percentage:any):Observable<any>{
  return this.http.post<any>(`${this.apiServerUrl}/admin/set_percentage`,{user_id:id_user,exam_id:id_exam,percentage:percentage}, { withCredentials: true });
}
public turn_on_off(id_exam:any,turn_value:any):Observable<any>{
  return this.http.post<any>(`${this.apiServerUrl}/admin/turn_on_off`,{exam_id:id_exam, turn:turn_value}, { withCredentials: true });
}

public payment(exam:any):Observable<any>{
  return this.http.post<any>(`${this.apiServerUrl}/exam/get_token`,{exam:exam}, { withCredentials: true });
}

//new
public get_topics(exam_id:any):Observable<any>{
  return this.http.post<any>(`${this.apiServerUrl}/admin/get_topics`,{exam_id:exam_id}, { withCredentials: true });
}

public remove_topic(topic_id:any,exam_id:any):Observable<any>{
  return this.http.post<any>(`${this.apiServerUrl}/admin/remove_topic`,{topic_id:topic_id,exam_id:exam_id}, { withCredentials: true });
}
public add_topic(topic_name:any,exam_id:any):Observable<any>{
  return this.http.post<any>(`${this.apiServerUrl}/admin/add_topic`,{topic_name:topic_name,exam_id:exam_id}, { withCredentials: true });
}

public edit_number_of_MCQ(topic_id:any,number_of_mcq:any):Observable<any>{
  return this.http.post<any>(`${this.apiServerUrl}/admin/edit_num_mcq`,{number_of_mcq:number_of_mcq,topic_id:topic_id}, { withCredentials: true });
}
public edit_number_of_coding(topic_id:any,number_of_coding:any):Observable<any>{
  return this.http.post<any>(`${this.apiServerUrl}/admin/edit_num_coding`,{number_of_coding:number_of_coding,topic_id:topic_id}, { withCredentials: true });
}
public add_mcq_to_topic(topic_id:any,exam_id:any,new_mcq:any):Observable<any>{
  return this.http.post<any>(`${this.apiServerUrl}/admin/add_mcq`,{exam_id:exam_id,topic_id:topic_id,new_mcq:new_mcq}, { withCredentials: true });
}
public add_coding_to_topic(topic_id:any,exam_id:any,new_coding:any):Observable<any>{
  return this.http.post<any>(`${this.apiServerUrl}/admin/add_coding`,{exam_id:exam_id,topic_id:topic_id,new_coding:new_coding}, { withCredentials: true });
}
public edit_mcq_in_topic(mcq_id:any,new_mcq:any):Observable<any>{
  return this.http.post<any>(`${this.apiServerUrl}/admin/edit_mcq`,{mcq_id:mcq_id,new_mcq:new_mcq}, { withCredentials: true });
}
public delete_mcq_in_topic(mcq_id:any,topic_id:any):Observable<any>{
  return this.http.post<any>(`${this.apiServerUrl}/admin/delete_mcq`,{mcq_id:mcq_id,topic_id:topic_id}, { withCredentials: true });
}
public delete_coding_in_topic(coding_id:any,topic_id:any):Observable<any>{
  return this.http.post<any>(`${this.apiServerUrl}/admin/delete_coding`,{coding_id:coding_id,topic_id:topic_id}, { withCredentials: true });
}

}
