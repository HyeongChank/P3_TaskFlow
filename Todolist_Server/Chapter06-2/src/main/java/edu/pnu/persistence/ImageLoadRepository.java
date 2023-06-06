package edu.pnu.persistence;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import edu.pnu.domain.ImageLoad;

public interface ImageLoadRepository extends CrudRepository<ImageLoad, Long> {
	List<ImageLoad> findByMidAndCdate(String mid, String cdate);
}
