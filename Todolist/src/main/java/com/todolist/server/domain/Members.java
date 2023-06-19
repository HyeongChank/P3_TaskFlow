package com.todolist.server.domain;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

//@Getter
//@Setter
//@ToString
//@Builder
//@AllArgsConstructor
//@NoArgsConstructor
@Entity
public class Members {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long seq;
	private String mid;
	private String password;
	// 아래 쿼리 이용한 날짜 자동 설정이 작동 안하여 @PrePersist, @PreUpdate 를 이용하여 날짜 지정함
//	@jakarta.persistence.Column(insertable = true, updatable=true, columnDefinition="date default CURRENT_DATE")
	@Column
	private Date mdate;
	@PrePersist
	@PreUpdate
	public void updateMdate() {
		this.mdate = new Date();
	}
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
