package edu.pnu.persistence;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import edu.pnu.domain.Members;

public interface MemberRepository extends CrudRepository<Members, Long> {
	List<Members> findBymid(String searchKeyword);
}
