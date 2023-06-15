package com.todolist.server.domain;

import java.util.Date;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Members {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long seq;
	private String mid;
	private String password;
//	@jakarta.persistence.Column(insertable = false, updatable=false, columnDefinition="date default CURRENT_DATE")
//	private Date mdate;
	private Date mdate;
	private String memail;
	public Members() {
		
	}
	public Members(long seq, String mid, String password, Date mdate, String memail) {
		super();
		this.seq = seq;
		this.mid = mid;
		this.password = password;
		this.mdate = mdate;
		this.memail=memail;
	}
	
	public String getMemail() {
		return memail;
	}
	public void setMemail(String memail) {
		this.memail = memail;
	}
	public long getSeq() {
		return seq;
	}
	public void setSeq(long seq) {
		this.seq = seq;
	}
	public String getMid() {
		return mid;
	}
	public void setMid(String mid) {
		this.mid = mid;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Date getMdate() {
		return mdate;
	}
	public void setMdate(Date mdate) {
		this.mdate = mdate;
	}
	@Override
	public String toString() {
		return "Members [mid=" + mid + ", password=" + password + "]";
	}
	

}
