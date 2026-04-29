package com.example.demo.repository;

import com.example.demo.model.Student;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class StudentRepository {

    private final JdbcTemplate jdbc;

    public StudentRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public int save(Student s) {
        String q = "insert into student(name, email, course) values(?,?,?)";
        return jdbc.update(q, s.getName(), s.getEmail(), s.getCourse());
    }

    public List<Student> findAll() {
        String q = "select * from student";
        return jdbc.query(q, (rs, i) ->
                new Student(
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getString("email"),
                        rs.getString("course")
                )
        );
    }

    public Student findById(int id) {
        String q = "select * from student where id=?";
        return jdbc.queryForObject(q, (rs, i) ->
                new Student(
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getString("email"),
                        rs.getString("course")
                ), id
        );
    }

    public int update(int id, Student s) {
        String q = "update student set name=?, email=?, course=? where id=?";
        return jdbc.update(q, s.getName(), s.getEmail(), s.getCourse(), id);
    }

    public int delete(int id) {
        String q = "delete from student where id=?";
        return jdbc.update(q, id);
    }
}