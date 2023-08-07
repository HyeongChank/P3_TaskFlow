package com.todolist.server.domain;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;


@Entity
@Table(name="imageload", indexes= {
		@Index(columnList="id"),
		@Index(columnList="path"),
		@Index(columnList="mid"),
		@Index(columnList="cdate"),
		@Index(columnList="num")
})
@EntityListeners(AuditingEntityListener.class)
public class ImageLoad {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String path;
	private String mid;
	private String cdate;
	private int num;
	
	public ImageLoad() {
		
	}

	public ImageLoad(Long id, String path, String mid, String cdate, int num) {
		super();
		this.id = id;
		this.path = path;
		this.mid = mid;
		this.cdate = cdate;
		this.num = num;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getMid() {
		return mid;
	}

	public void setMid(String mid) {
		this.mid = mid;
	}

	public String getCdate() {
		return cdate;
	}

	public void setCdate(String cdate) {
		this.cdate = cdate;
	}

	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
	}

	@Override
	public String toString() {
		return "ImageLoad [id=" + id + ", path=" + path + ", mid=" + mid + ", cdate=" + cdate + ", num=" + num + "]";
	}

	
	
}
