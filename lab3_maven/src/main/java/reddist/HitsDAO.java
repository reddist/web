package reddist;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import utils.SessionFactoryUtil;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaDelete;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

public class HitsDAO {

    public void saveHit(HitsEntity hit){
        // Получаем сессию из SessionFactoryUtil
        Session session = SessionFactoryUtil.getSession();
        // Создаём транзакцию - запрос к бд на добавление строки в таблицу
        Transaction transaction = session.beginTransaction();
        session.save(hit);
        transaction.commit();
        // Закрываем отработавшую сессию
        session.close();
    }

    public List<HitsEntity> getHitsBySessionId(String sessionId){
        // Получаем сессию из SessionFactoryUtil
        Session session = SessionFactoryUtil.getSession();
        // Создаём CriteriaQuery, аналог запроса 'SELECT * FROM hits WHERE sessionId=<значение переменной sessionId, переданной в метод>'
        CriteriaBuilder cb = session.getCriteriaBuilder();
        CriteriaQuery<HitsEntity> cr = cb.createQuery(HitsEntity.class);
        Root<HitsEntity> root = cr.from(HitsEntity.class);
        cr.select(root).where(cb.equal(root.get("session_id"), sessionId));
        // Выполняем запрос CriteriaQuery
        Query<HitsEntity> query = session.createQuery(cr);
        List<HitsEntity> results = query.getResultList();
        // Закрываем отработавшую сессию и возвращаем результаты
        session.close();
        return results;
    }

    public List<HitsEntity> deleteHitsBySessionId(String sessionId){
        // Получаем сессию из SessionFactoryUtil
        Session session = SessionFactoryUtil.getSession();
        // Создаём CriteriaDelete, аналог запроса 'delete FROM hits WHERE sessionId=<значение переменной sessionId, переданной в метод>'
        CriteriaBuilder cb = session.getCriteriaBuilder();
        CriteriaDelete<HitsEntity> criteriaDelete = cb.createCriteriaDelete(HitsEntity.class);
        Root<HitsEntity> root = criteriaDelete.from(HitsEntity.class);
        criteriaDelete.where(cb.equal(root.get("session_id"), sessionId));
        // Выполняем запрос CriteriaDelete с помощью Transaction
        Transaction transaction = session.beginTransaction();
        session.createQuery(criteriaDelete).executeUpdate();
        transaction.commit();
        // Закрываем отработавшую сессию и возвращаем пустой массив для вывода оного в табличку
        session.close();
        return new ArrayList<HitsEntity>();
    }
}
