package edu.pnu.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class ImageLoad {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String path;
	private String mid;
	private String cdate;
	
	public ImageLoad() {
		
	}
	public ImageLoad(Long id, String path, String mid, String cdate) {
		super();
		this.id = id;
		this.path = path;
		this.mid = mid;
		this.cdate = cdate;
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
	@Override
	public String toString() {
		return "ImageLoad [id=" + id + ", path=" + path + ", mid=" + mid + ", cdate=" + cdate + "]";
	}
	
	
}
