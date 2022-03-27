package com.example.uscdoordrink;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class SignupActivity extends AppCompatActivity {

    private EditText Username;
    private EditText Password;
    private EditText Verifypassword;
    private Button signup;
    private Button login;
    private TextView Info;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup);

        Username = (EditText)findViewById(R.id.username);
        Password = (EditText)findViewById(R.id.password);
        Verifypassword = (EditText)findViewById(R.id.verifyPassword);
        Info = (TextView)findViewById(R.id.dontmatch);
        signup = (Button)findViewById(R.id.suButton);
        login = (Button)findViewById(R.id.loginButton);


        Info.setText("");

        signup.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                userExsists(Username.getText().toString(), Password.getText().toString(), Verifypassword.getText().toString());
            }
        });

        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                openLogin();
            }
        });
    }

    private void userExsists(String userName, String userPassword, String vuserPassword){
        //check if username exsists
        if(userName == "Celia"){
            Info.setText("Username already exisits");
        }
        //check if passwords match
        else if(userPassword != vuserPassword){
            Info.setText("Passwords do not match");
        }
        else{
            Intent intent = new Intent(this, MainPgeActivity.class);
            startActivity(intent);
        }
    }

    private void openLogin(){
        Intent intent = new Intent(this, LoginActivity.class);
        startActivity(intent);
    }
}