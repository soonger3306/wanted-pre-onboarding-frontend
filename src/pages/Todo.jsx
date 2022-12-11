import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import TodoList from "./../components/TodoList";
import api from "../shared/api";
const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState("");

  const onChangeTodoHandler = (e) => {
    setTodo(e.target.value);
  };
  const todoHandler = async (e) => {
    e.preventDefault();
    const { data } = await api.post("/todos", {
      todo: todo,
    });

    setTodoList([...todoList, data]);
    setTodo("");
  };

  useEffect(() => {
    async function response() {
      return await api.get("/todos");
    }
    response().then((data) => setTodoList(data?.data));
  }, []);

  return (
    <Background>
      <Layout>
        <Div>
          <Input value={todo} onChange={onChangeTodoHandler} />
          <Button onClick={todoHandler}>✔</Button>
        </Div>
        <Text>Working🔥</Text>
        <Wrapper>
          {todoList.map((todo) =>
            !todo.isCompleted ? (
              <TodoList
                contents={todo}
                key={todo.id}
                setTodoList={setTodoList}
              />
            ) : null
          )}
        </Wrapper>
        <Text>Done ! 🎉</Text>
        <Wrapper>
          {todoList.map((todo) =>
            todo.isCompleted ? (
              <TodoList
                contents={todo}
                key={todo.id}
                setTodoList={setTodoList}
              />
            ) : null
          )}
        </Wrapper>
      </Layout>
    </Background>
  );
};

export default Todo;

const Background = styled.div`
  background-size: cover;
  background-image: url(https://velog.velcdn.com/images/soonger3306/post/41dbb138-607a-4793-8a17-f064330754c6/image.gif);
  height: 100vh;
`;
const Layout = styled.div`
  border-radius: 20px;
  background-color: #1c3557;
  height: 100%;
  width: 50%;
  margin: 0 auto;
  overflow: auto;
`;
const Input = styled.input`
  color: #044b9c;
  margin-top: 10px;
  width: 50%;
  height: 6%;
  padding: 10px;
  font-size: 25px;
  border: 1px solid rgb(87, 159, 222);
  background-color: #ffffffd0;
  border-radius: 10px;

  &:hover {
    border: 1px solid rgb(42, 134, 214);
  }
  &:focus {
    outline: 1px solid rgb(42, 134, 214);
  }
`;
const Div = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  gap: 12px;
  align-content: space-around;
  margin-bottom: 50px;
  row-gap: 12px;
`;
const Button = styled.button`
  color: #79a3be;
  background-color: #111424;
  border: none;
  width: 5%;
  border-radius: 15px;
  height: 40px;
  margin: 10px;
`;
const Text = styled.h2`
  color: white;
  text-decoration: underline;
  text-decoration-color: #85b5dd;
`;
