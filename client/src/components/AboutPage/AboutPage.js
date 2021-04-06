import axios from "axios";
import React from "react";
import styled from "styled-components";

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontSizes.titleSize};
`;
const P = styled.p`
  font-size: ${(props) => props.theme.fontSizes.base};
`;

const AboutPage = () => {
  axios.get("/api/users/auth").then((res) => {
    console.log("auth ===> ", res.data);
  });
  return (
    <div>
      <Title>여기는 about 페이지 입니다.</Title>
      <P>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
        commodi corporis, perspiciatis id numquam recusandae esse aliquam
        dolorum pariatur deserunt animi fugit expedita non odit. Repudiandae
        consequuntur rerum perspiciatis error quaerat incidunt maxime distinctio
        explicabo officia. Delectus repellendus aperiam dolores voluptatum sed
        est vero ratione nisi fugiat earum, animi provident reprehenderit.
        Temporibus exercitationem iure quaerat nisi incidunt, dolorem illum,
        debitis quia adipisci praesentium voluptatibus illo consequatur et
        inventore odio dolor architecto nesciunt, deleniti quas atque rerum
        corporis? Delectus accusantium dolores fugit odit repellat quod maxime
        et exercitationem quidem, dicta, sed placeat quis veniam illo nam illum
        mollitia. Quisquam dolorum voluptatum repellat incidunt corporis ex nemo
        molestiae doloremque veritatis, ullam reprehenderit consequatur numquam,
        fugit aliquam illum optio porro accusantium similique facilis rem fugiat
        perferendis nulla! Et laudantium maxime architecto, deserunt sint fuga
        repudiandae cupiditate dolorem in voluptates odit inventore delectus,
        magnam a at minus aspernatur officia nisi? Optio sunt, non nulla natus
        et, quae magni eos, cum aliquam nisi error vel fugiat voluptatibus odio
        quas! Soluta quisquam, inventore labore, ea dolores magni perspiciatis
        tempore exercitationem, ratione aut ut aperiam vero incidunt praesentium
        excepturi aliquid esse nisi voluptate blanditiis at voluptas fugit
        possimus. Voluptates iure illo molestiae necessitatibus quisquam porro
        deleniti voluptas, molestias ea sunt vel magni unde laudantium ratione
        minima dolores accusamus mollitia distinctio quam, consequatur
        reiciendis, sed quibusdam minus! Vitae placeat itaque suscipit
        dignissimos magni explicabo, beatae officiis consequuntur sapiente cum
        incidunt expedita sint accusantium quibusdam earum optio quam iure sed
        iste maxime fuga cumque. Alias maxime expedita, tempore deleniti
        voluptate nihil eos obcaecati quas, ex nostrum ipsa autem. Nemo
        voluptatum fugit accusamus illum a porro tempore tenetur eveniet
        maiores. Quia culpa reiciendis cum ab quaerat ea doloribus quis,
        voluptatibus voluptatum sint quas in dolorum voluptatem praesentium,
        quidem libero est veniam earum impedit. Qui unde est praesentium
        aspernatur eaque repellat eius voluptates explicabo sed excepturi sequi
        molestiae inventore, quis tenetur fugit, rerum similique quasi
        perspiciatis reprehenderit incidunt quidem iure modi impedit! Ex unde
        reprehenderit magni, voluptas cumque debitis aspernatur repellat, enim
        ullam molestiae iste, velit modi pariatur eum eaque totam earum numquam
        possimus? Eos autem fuga odit fugiat beatae numquam nobis aut, dolorum
        velit sed delectus facilis voluptate vero neque, expedita cumque,
        officiis soluta incidunt ipsa ea aperiam! Cupiditate sint ea enim
        dolorem reprehenderit odit voluptate quas veritatis quia quidem odio
        adipisci pariatur tempore, ab maiores atque, facere, nihil consequatur
        laborum iure explicabo deserunt illo. In voluptas doloremque amet ipsam,
        dolor, quibusdam cupiditate nam tempore eaque tempora quia. Dolor iste
        tenetur sunt accusantium! Commodi aliquam unde ea officia labore
        deserunt vel iure? Quasi illo velit consequuntur doloremque vitae
        aliquid, sequi cum qui provident hic sit laborum minima nam ad, modi
        nostrum. Nostrum hic itaque recusandae corporis necessitatibus delectus
        voluptate cupiditate magni blanditiis voluptatem a accusamus, quisquam
        quis dolorem, mollitia quaerat assumenda? Est animi incidunt dicta nobis
        pariatur rem totam provident. Error dignissimos odio voluptate explicabo
        consequuntur amet nostrum, omnis culpa! Ex excepturi modi labore alias
        voluptates dolorem quia itaque, natus praesentium sint, magni eos error
        magnam, similique hic atque tempore?
      </P>

      <hr />
      <P>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis impedit
        porro dolorem, nihil suscipit quos blanditiis, nemo soluta debitis
        assumenda dignissimos nulla optio voluptate eos! Aspernatur voluptatem
        dolor vel quae minima aliquam alias, consequuntur provident hic
        inventore, impedit expedita odit ut dignissimos modi a obcaecati
        assumenda velit iure perferendis esse molestiae laborum. Error
        laudantium necessitatibus deserunt fugiat, quisquam dolores excepturi
        doloremque ut harum tempora voluptatibus distinctio corrupti ipsam
        possimus ab magnam quam minus, dignissimos voluptatem blanditiis est
        reprehenderit consectetur nesciunt molestiae! Debitis, delectus eos.
        Explicabo ex cum quasi ullam libero a quibusdam soluta, accusantium
        perferendis voluptates consequatur fuga possimus dignissimos nesciunt
        officiis culpa fugit blanditiis nulla. Totam quaerat molestiae corrupti
        est repellat dolor eaque! Rem optio iste atque culpa nam illo hic
        veritatis? Consequatur facilis nisi at reiciendis cumque dicta quasi
        saepe qui laborum quidem, aut quas tempora eius illum, mollitia eligendi
        distinctio repellendus eos laboriosam. Nobis cum ea molestias
        exercitationem tempore enim voluptatum labore. Nostrum dicta mai hrores
        asperiores ad accusamus, enim officiis fugiat dolores impedit eum,
        distinctio itaque facilis? Nesciunt incidunt quis deleniti
        exercitationem minima ipsa accusamus ipsam ab tempora! Ipsum molestiae
        placeat facere autem quas sit eveniet, mollitia quisquam quam ipsa
        dolorem fuga laborum rerum nihil veniam doloremque dolorum facilis,
        asperiores eum porro fugit, ad iste. Cum iure minus tempore placeat!
        Debitis temporibus, expedita doloremque inventore cumque at
        reprehenderit fuga non, repellendus aperiam culpa maxime suscipit ipsum
        ut, asperiores qui molestias. Doloremque nisi dolores, harum facere
        quidem hic, ratione maxime velit beatae dolor esse sequi ad in est, odio
        a! Asperiores natus dolorem, cum iusto vero iste aliquam, quidem dolorum
        itaque, fugit ut excepturi enim dolores ex commodi alias aspernatur
        perspiciatis iure expedita et nulla? Ullam vel odit in quam sapiente,
        accusantium voluptas asperiores explicabo, modi quae dicta iure
        perferendis nulla maxime aperiam voluptatem, rem aut inventore est
        facilis pariatur distinctio perspiciatis ratione debitis. Recusandae
        quas cum fuga inventore, necessitatibus, excepturi alias nostrum atque
        praesentium quia, porro labore rem! Modi quibusdam necessitatibus at
        pariatur? Tenetur fugit neque, quam amet cupiditate fuga deserunt
        perferendis odio ut optio cumque quidem nostrum expedita repudiandae
        eius! Veritatis ducimus mollitia, recusandae tempore accusantium illo
        fugit rerum! Voluptate quas explicabo numquam sit eos soluta odit quo,
        praesentium aut necessitatibus quae voluptates ipsa facere ipsam alias
        quod dolor rem id esse exercitationem. Fugit dolor aspernatur quisquam
        ut accusamus sed rem consequatur molestiae? Recusandae quia, et
        assumenda, rerum rem laudantium laborum pariatur voluptatum illo,
        consequuntur ipsa!
      </P>
      <hr />
      <P>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
        consectetur adipisci tenetur numquam vitae eum iusto quae alias sunt?
        Delectus, velit sed libero commodi facere molestiae eos accusamus,
        voluptatem illum magnam autem, ullam quidem blanditiis itaque
        exercitationem temporibus. Exercitationem eius, ipsum animi nostrum
        facilis vitae maxime perspiciatis sed dolorum modi adipisci quis id. Est
        delectus deserunt molestiae quis culpa. Quibusdam hic inventore fugit,
        aliquam, eligendi magni corporis earum itaque eaque laborum ipsum
        cupiditate sint sunt exercitationem voluptatibus, provident excepturi
        tempore ea voluptates suscipit vel. Facere saepe cumque nam, nulla
        explicabo sapiente quia minima eveniet obcaecati? Unde possimus
        voluptatem consequuntur provident natus eveniet exercitationem porro?
        Voluptatem eligendi, nobis atque suscipit adipisci obcaecati corporis
        odio architecto reiciendis doloremque quibusdam tempore impedit illum,
        non repellendus? Odit quos esse adipisci inventore, expedita nam
        molestiae doloribus quasi sed vero nemo? Temporibus dolorum laudantium
        officia provident suscipit hic quisquam voluptatum! Praesentium ipsam
        aspernatur officia quam, delectus iusto porro exercitationem eum dolor
        id modi? Odit accusamus qui alias tempora et doloremque culpa rerum
        natus, autem reprehenderit quisquam officiis. Adipisci sed, aliquam
        molestias natus quasi unde, accusamus cum quibusdam fugiat ipsa iste
        enim magni explicabo tempora a quo nobis maiores! Nostrum ut neque
        veritatis sed, consectetur placeat exercitationem veniam corrupti facere
        debitis ipsam dignissimos provident labore dolore iste deleniti
        accusantium ipsa amet eaque beatae repellendus aperiam excepturi? Magni
        quas doloribus ipsa fuga voluptas. Quaerat ratione libero quis nulla
        sequi non quidem ducimus enim, blanditiis nihil! Nemo consequuntur esse
        corrupti labore totam possimus laboriosam et delectus. Quaerat a, nulla
        nostrum fugiat eum vero at illum necessitatibus suscipit qui distinctio
        deserunt quam minima ab voluptates reprehenderit, sapiente quos
        provident veritatis itaque? Nisi laudantium officia, doloremque cumque a
        in saepe adipisci amet perspiciatis. Delectus dolorem aliquam animi
        placeat quos reiciendis voluptate ad. Aut labore expedita placeat porro
        dignissimos, et recusandae beatae aperiam soluta voluptate, quo autem.
        Fuga quia alias numquam, quod in, omnis, hic facere sint beatae aliquid
        cum autem officia qui. Iste commodi error nostrum minima veritatis harum
        assumenda quidem id beatae omnis. Numquam, nihil labore doloremque
        officia, animi repudiandae maiores fuga quas exercitationem eligendi
        temporibus quaerat molestias est eum sit, saepe quo fugit tempore.
        Doloremque id atque ut nisi, vero consequuntur. Consequatur id velit
        error earum ducimus in pariatur eum consectetur odit veritatis harum vel
        adipisci minus, ea ex! Nobis non, laboriosam exercitationem molestias
        pariatur tempore sequi, molestiae, optio totam dolores error accusamus
        inventore obcaecati eligendi! Asperiores, rem placeat porro et
        voluptates quisquam accusamus voluptatum itaque labore in quae soluta
        similique cupiditate blanditiis ex quasi fugiat rerum maiores sit? Quis
        veritatis saepe, exercitationem alias numquam minima dolor suscipit modi
        molestias, ad neque officia omnis illum asperiores fuga doloremque?
        Voluptatem magni, vel quibusdam accusantium consequuntur, eveniet
        dolorem dolor quod unde reprehenderit magnam cumque. Cumque a accusamus
        dolores omnis in eligendi, cum quidem numquam earum rerum placeat eum
        tempore porro esse eveniet, recusandae qui accusantium vitae ipsum,
        nobis architecto! Similique consequuntur minima quibusdam hic tempora
        nesciunt nobis? Minus, explicabo veniam veritatis dolorem voluptatibus
        doloremque harum libero fugit odio molestiae facilis earum soluta
        similique eveniet quaerat. Optio quo distinctio vel assumenda quidem
        sequi aliquid maiores facilis officiis molestiae illo dicta beatae,
        culpa sapiente. Maiores dolorum reiciendis nam voluptatum similique
        atque perferendis vero neque odio nesciunt aliquid modi nobis, ex
        assumenda libero impedit id asperiores delectus officia eligendi commodi
        ipsum natus dolores fugiat? Temporibus maiores non dicta ipsa velit enim
        provident cum, doloremque odio? Ipsa possimus, numquam voluptatibus
        provident vel harum accusantium! Sapiente tempora accusantium in est
        asperiores id nobis magni. Velit enim error deserunt vel recusandae
        ullam a repellendus sed natus aut illo illum quibusdam dolor autem
        tenetur ex odit nam, et sint doloribus perferendis. Minus ad veniam odit
        facilis sapiente repellat, velit qui rerum rem, quam perspiciatis quas
        optio provident impedit similique commodi quo autem minima quaerat
        nesciunt voluptate dignissimos odio dolor. Nulla ea reiciendis dolor?
        Illum quis ducimus ad maiores quod, dicta nemo eum nam fugit alias unde
        iste qui vitae? Voluptas maxime facilis, aspernatur optio, saepe magni
        assumenda exercitationem illum soluta nulla architecto fugiat dolorum
        recusandae aperiam delectus vitae ea vel voluptate veniam velit itaque?
        Magni, doloremque nesciunt cum quia ullam repellat nulla ab ipsum! Totam
        cupiditate similique quisquam animi cumque tenetur ipsam corrupti sed
        quam voluptatibus eveniet, sunt, temporibus, praesentium possimus culpa
        accusantium dolore saepe facilis. Autem tempora, aliquid ducimus minus
        unde cupiditate quos consequatur deleniti ullam, mollitia ut. Sapiente
        voluptatum beatae sint tempora quas reiciendis iusto ad assumenda
        ratione debitis, optio exercitationem nostrum est sequi cumque
        dignissimos amet, corporis eaque commodi dolores. Cumque culpa
        voluptatibus quasi nemo laborum, velit harum exercitationem esse
        assumenda nam cum veritatis minus dolore? Tenetur ipsam dolores
        assumenda voluptate? Odit fuga consequatur magnam, provident amet, ea
        accusamus quis fugiat excepturi voluptates cum deleniti dicta facere
        quas hic suscipit nostrum praesentium vitae minus at! Eaque harum
        ducimus culpa adipisci, omnis facere nulla beatae necessitatibus. Beatae
        eveniet tempore, vitae quae dolor doloribus, labore corrupti iure
        obcaecati aliquid ipsam? Unde laborum, commodi, corporis aut aliquam
        impedit quasi iste ad aspernatur laboriosam officia eaque fugit omnis
        nemo explicabo molestiae veritatis nam quod quos beatae minus totam
        reprehenderit? Officia sunt eaque nemo esse neque eveniet, dignissimos
        veniam veritatis. Minima assumenda doloremque dignissimos sed. Ad
        blanditiis fugiat est minima porro sed alias nulla, temporibus
        recusandae ducimus. Alias at voluptatum numquam eum repellendus! Aut
        quas sit ad praesentium animi architecto quidem explicabo cupiditate
        doloribus, quaerat commodi adipisci, repellendus delectus, possimus
        voluptate mollitia. Consequuntur, non possimus sint dolores fugit, culpa
        ad dignissimos minima esse temporibus quidem harum, quas amet incidunt.
        Placeat ab odio consectetur quam eligendi similique consequuntur nulla,
        numquam maxime mollitia nobis corporis delectus, earum quaerat
        praesentium ut voluptas. Exercitationem illo dicta repellat dolorem.
        Doloribus earum quisquam sit delectus nihil voluptatibus illum ut
        minima, reiciendis ipsum, quaerat vero porro hic unde veritatis expedita
        sed. Ea, praesentium quibusdam sed ex quis vel nihil dicta fugit quidem
        molestias nam, tempore laboriosam a itaque saepe quam recusandae sint
        blanditiis ipsum earum assumenda eveniet? Earum corporis, sit neque
        molestias debitis minima ab cum exercitationem consequatur ipsa
        asperiores, eum eligendi. Vero reiciendis illo at commodi!
      </P>
    </div>
  );
};

export default AboutPage;
