package com.bezkoder.springjwt.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.bezkoder.springjwt.payload.request.user_request.CreateAccountRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "username"),
                @UniqueConstraint(columnNames = "email")
        })
public class User extends BaseEntity {
    @Column(name = "username", nullable = false)
    @Size(max = 20)
    private String username;

    @Column(name = "name", nullable = false)
    @Size(max = 50)
    private String name;

    @Column(name = "email", nullable = false)
    @Size(max = 50)
    @Email
    private String email;

    @Column(name = "password", nullable = false)
    @Size(max = 120)
    private String password;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    public User(String username, String email, String name, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.name = name;
    }

}
